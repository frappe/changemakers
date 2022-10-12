from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in metta/__init__.py
from metta import __version__ as version

setup(
	name="metta",
	version=version,
	description="APF NGO Core App",
	author="hussain@frappe.io",
	author_email="hussain@frappe.io",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
