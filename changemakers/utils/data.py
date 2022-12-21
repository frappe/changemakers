import re
import frappe
import requests

from bs4 import BeautifulSoup
from frappe.utils import update_progress_bar


def is_valid_indian_phone_number(phone):
    expression = re.compile(r"^([0]|\+91)?\d{10}$")
    if expression.match(phone):
        return True
    return False


def scrap_and_import_india_district_list():
    """
    Scraps the Integrated Online Government Directory (https://igod.gov.in/)
    and creates `District` documents linked to the state
    """
    all_states = frappe.get_all(
        "State", fields=["name", "code"], filters={"country": "India"}
    )

    URL_TEMPLATE = "https://igod.gov.in/sg/{0}/E042/organizations"
    state_wise_districts = frappe._dict({})  # to store state wise districts

    for i, state in enumerate(all_states):
        try:
            response = requests.get(URL_TEMPLATE.format(state.code))
            soup = BeautifulSoup(response.text, "html.parser")
            total_districts = int(
                soup.find_all(string=re.compile("([0-9]+) Results"))[0]
                .strip()
                .split(" ")[0]
            )

            districts = [
                s.strip().split(", ")[0]
                for s in soup.find_all(string=re.compile(state.name))
            ]
            num_districts = len(districts)

            start = num_districts
            LIMIT = 5
            while start <= total_districts:
                response = requests.get(
                    f"https://igod.gov.in/sg/{state.code}/E042/organizations_more/{start}/{LIMIT}",
                    headers={
                        "X-Requested-With": "XMLHttpRequest"
                    },  # I figured out their implementation somehow 😉
                )
                inner_soup = BeautifulSoup(response.text, "html.parser")
                remaining_districts = [
                    s.strip().split(", ")[0]
                    for s in inner_soup.find_all(string=re.compile(state.name))
                ]
                districts = districts + remaining_districts
                start += LIMIT

            state_wise_districts[state.name] = districts
            update_progress_bar("Fetching Districts: ", i, len(all_states))
        except Exception:
            print("\nFetching Failed For State:", state.name)

    for i, (name, district_list) in enumerate(state_wise_districts.items()):
        print(name, len(district_list))
        # Create district records
        for d_name in district_list:
            frappe.get_doc(doctype="District", state=name, name=d_name).insert(
                ignore_if_duplicate=True
            )
        update_progress_bar("Creating District Records: ", i, len(state_wise_districts))