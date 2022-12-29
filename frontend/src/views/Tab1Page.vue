<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div
        class="flex flex-col self-center items-center justify-center h-full space-y-3"
      >
        <Button appearance="primary">Hello FrappeUI</Button>

        <Badge color="yellow">Hello</Badge>

        <h1 className="text-3xl font-bold text-blue-700">Hello world!</h1>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";

import { createDocumentResource } from "frappe-ui";

import { Beneficiary } from "@/../types/FrappeChangemakers/Beneficiary";

const user = createDocumentResource({
  doctype: "Beneficiary",
  name: "BENE-2022-12-00002",
  onSuccess(d: Beneficiary) {
    console.log(d.age);
  },
});

const beneficiary: Beneficiary = user.doc;

user.reload();
</script>
