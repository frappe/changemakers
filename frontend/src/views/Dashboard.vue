<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div
        class="flex flex-col self-center items-center justify-center h-full space-y-3"
      >
        <h2 class="text-gray-700 font-medium text-7xl">{{ beneficiaryDoc.doc && beneficiaryDoc.doc.gender }}</h2>
        <Badge color="green">Completed</Badge>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonPage,
  IonContent,
} from "@ionic/vue";

import { createDocumentResource } from "frappe-ui";

import { Beneficiary } from "@/../types/FrappeChangemakers/Beneficiary";

const beneficiaryDoc = createDocumentResource({
  doctype: "Beneficiary",
  name: "BENE-2022-12-00002",
  onSuccess(d: Beneficiary) {
    console.log(d.gender);
  },
});

beneficiaryDoc.reload();
</script>
