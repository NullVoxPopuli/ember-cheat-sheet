import { t } from "ember-intl";
import { pageTitle } from "ember-page-title";

import Header from "../components/header.gts";
import Nav from "../components/nav.gts";

<template>
  {{pageTitle (t "layout.application.title")}}

  <div class="grid body-wrapper">
    <Nav />
    <Header />

    <main>
      <p>{{t "layout.application.description-1" htmlSafe=true}}</p>
      <p>{{t "layout.application.description-2" htmlSafe=true}}</p>

      {{outlet}}
    </main>
  </div>
</template>
