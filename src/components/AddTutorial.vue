<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="tutorial.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="tutorial.description"
          name="description"
        />
      </div>

      <button @click="saveTutorial" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { remult } from "../http-common";
import Tutorial from "@/types/Tutorial";
import { getEntityRef } from "remult";

export default defineComponent({
  name: "add-tutorial",
  data() {
    return {
      tutorial: remult.repo(Tutorial).create(),
      submitted: false,
    };
  },
  methods: {
    saveTutorial() {
      getEntityRef(this.tutorial).save()
        .then((response) => {
          this.tutorial = response;
          console.log(response);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newTutorial() {
      this.submitted = false;
      this.tutorial = remult.repo(Tutorial).create();
    },
  },
});
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
