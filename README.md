<h3 style="font-size: 16px" align="center">Frappe Changemakers, for the Real Changemakers.</h3>

![Frappe Changemakers Workspace Teaser View](https://user-images.githubusercontent.com/34810212/225823098-eb942986-2ec6-49f1-adc8-e0d21da46c30.png)

<p align="center">

![Server Tests](https://github.com/frappe/changemakers/actions/workflows/ci.yml/badge.svg)
![e2e Tests](https://github.com/frappe/changemakers/actions/workflows/playwright.yml/badge.svg)

</p>

## What is Frappe Changemakers?

Frappe Changemakers is basically a **Beneficiary Management System**. It helps non-profit and social organisations to manage their beneficiaries and track services provided to them. Although, it was developed for a specific use case of managing a **Homeless Care Programme**, it can be easily customised to fit any generic use case in which services are being provided to someone in need. It is made with the field workers in mind.

## Tech Stack

Frappe Changemakers is a custom Frappe app built on [Frappe Framework](https://frappeframework.com). The PWA is built using [Frappe UI](https://frappeui.com), [VueJS](https://vuejs.org/) and [Ionic](https://ionicframework.com/docs/vue/overview). We plan to convert the PWA to a native mobile app using [CapacitorJS](https://capacitorjs.com/) soon.

## Installation

You can get a local installation running by following the below steps:

1. Setup Frappe bench, instructions can be found [here](https://frappeframework.com/docs/v14/user/en/installation).
2. Create a new site
3. Install the **Changemakers** app using the bench `get-app` and `install-app` command:

```sh
bench get-app changemakers # Add to bench
bench --site mysite.localhost install-app changemakers # Install on the site you want
```

## The Core Pieces

In this section, I have described some central pieces of the **Changemakers** platform.

### Beneficiary: At The Center of Everything Else

![Beneficiary Form View](https://user-images.githubusercontent.com/34810212/225822219-99c855f7-55dd-4390-a335-19943a033bda.png)

The **Beneficiary** DocType is central to every other DocType in the system. It contains all the information regarding the Beneficiary, the person to whom the services will be provided. In the Homeless Care Program, the beneficiary refers to the Homeless person, but it can easily be customized to store the information relevant to your particular use case.

### Cases

Cases (or Tickets) power the core workflow of identification and fulfillment of the need. A case can be assigned a type (like Food, Shelter etc.), priority and more. Using the **built-in assignments feature** in Frappe Framework, multiple people can be assigned to a particular case.

#### My Cases Report

Since the social workers should be able to easily see a summary of the tickets assigned to or created by them, we have a very useful report:

![My Cases Report](https://user-images.githubusercontent.com/34810212/225826337-d3ca305d-9099-4a62-b1ce-061df9705544.png)

### Rescue

![Rescue Form View](https://user-images.githubusercontent.com/34810212/225891959-787e437c-3453-49f2-b420-a8be68a5af29.png)

**Rescue** DocType can be used to track in-field rescue operations. The Geo-location field can be used to set the exact rescue location by the Field workers.

### Services

![Food Distribution Form View](https://user-images.githubusercontent.com/34810212/225826681-e365d128-1199-4de4-9dfe-f4a6b3d00b92.png)

This category of DocTypes is used to track services provided to the Beneficiaries. Below are some of the service related DocTypes with a summary:

* **Food Distribution Record**: Used to track Food Distributions.

* **Entitlement Request**: Used to track entitlements (Identity Card, etc.) to be serviced.

* **Shelter Home Admission/Exit**: Used to track Shelter Home services.

...and more.

### Changemakers User Profile

Used to store additional fields related to a user. Currently, stores the **Designation** and **Organisation** of the user. The profile can be created/viewed from the **User** form view:

![Create User Profile](https://user-images.githubusercontent.com/34810212/225975194-8d704883-b899-499d-bb64-ccda45c96285.png)

### Other Masters

There are other DocType's that are used to track master data of entities that are related to providing services:

* Organisation: To track different organisations or partners.
* Shelter Home: Master data for shelter home.
* Healthcare Provider: Master data for hospitals and other healthcare providers.
* Learning Center: Master data for different types of learning centers.

## Customizations

Since, Changemakers is built on Frappe Framework, **a lot of flexibility and customisation options are at your disposal**. You can customise the DocTypes (add/remove fields, validations etc.) to a great extent. You can add client/server scripts to control the behavior even more. Apart from using the existing roles (like Shelter Team Member, Food Team Member, etc.), you can easily create a configure more roles and permissions.

The **Customisation Form** and the **Role Permission Manager** are very powerful tools that you can use to mold this application to your use case. You can use the Awesome Bar (search bar in the Frappe admin interface) to look for these pages.

## The Back Story

This project has been developed in collaboration with [Azim Premji Foundation](https://azimpremjifoundation.org/philanthropy). Frappe Changemakers is being currently *used in production* by two of the partner organisations of APF to run the Homeless Care programme in Bangalore (Smile Care) and Chennai (Madras School of Social Work). They plan to roll-out the programme pan-India in the near future.

## Progressive Web App / Mobile App [ALPHA]

![PWA Teaser](https://user-images.githubusercontent.com/34810212/225822781-c40b0581-a925-49a4-9893-08aab90eaf6f.png)

The mobile frontend is still a work in progress, but you can try out the alpha version by visiting `/c` in your site with *Changemakers* installed.

## User Manual

You can access the user manual for this app [here](https://docs.google.com/document/d/1N-5WkzGN4Foi1QC-8KzN4FJ0XXIKff0mjXjtg6ckyPY/edit?usp=sharing). Special thanks to [Umair Sayyed](https://www.linkedin.com/in/umairs/) for writing this manual.

## Contributions

Some of the ways in which you can contribute to this project:

1. ⭐ By giving it a star on GitHub, it encourages us to do more!
1. 🐛 By Reporting any bugs/issues encountered during usage.
1. 🙈 By Fixing Typos, Booboos etc. and raising a Pull Request.
1. 🚀 By sharing it with the world!

If you think this app can be made more generic to fit more (or your) use cases, I would be more than happy to have a chat with you. You can create a new issue titled **Use Case** and tag me!

## Thanks

Special thanks to **Jagadisha Behura** and **Nikhil George** from the IT team at APF to help with the requirement collection and testing phases. Also, a big thanks to the whole APF team for sponsoring this FOSS project!

Thanks to [Rushabh](https://www.linkedin.com/in/rushabhmehta1/) and [Umair](https://www.linkedin.com/in/umairs/) from Frappe for collaborating with me on this project.

## License

[APGL-3.0](./LICENSE)
