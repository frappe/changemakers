from setuptools import find_packages, setup

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in changemakers/__init__.py
from changemakers import __version__ as version

setup(
	name="changemakers",
	version=version,
	description="APF NGO Core App",
	author="hussain@frappe.io",
	author_email="hussain@frappe.io",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires,
)
