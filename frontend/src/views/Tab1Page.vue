<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Hi Hussain!</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Hi Hussain!</ion-title>
        </ion-toolbar>
      </ion-header>

      <div
        class="flex flex-col self-center items-center justify-center h-full space-y-3"
      >
        <Button appearance="primary">Hello FrappeUI</Button>

        <Badge color="yellow">Hello</Badge>

        <h1 className="text-3xl font-bold text-green-700">Hello world!</h1>
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


const user = createDocumentResource({
  doctype: 'User',
  name: 'Administrator',
  onSuccess(d) {
    console.log(d);
  }
})

user.reload();
</script>
