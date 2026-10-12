---
imports:
  - import { t } from 'ember-intl';
  - import GuideSection from '#components/guide-section.gts';
  - import RefList from '#components/ref/list.gts';
---

<p>{{t 'octane-v-classic' htmlSafe=true}}</p>


<GuideSection @id='nomenclature' as |Section|>
  <Section @id='template-tag'>

```gjs
import Avatar from './avatar';

const greeting = 'Hello';

<template>
  <Avatar />

  {{greeting}}, {{@name}}!
</template>
```

<RefList as |x|>
  <x.guide @to="components/template-tag-format/">
    {{t 'refs.guides.template-tag' htmlSafe=true}}
  </x.guide>
</RefList>

  </Section>

  <Section @id='angle-brackets'>

```hbs
<SomeComponent />
↑  <br />       ↑
   ↑    ↑
```

  </Section>

  <Section @id='nested-components'>

```gjs
import SomeComponent from './nested/some-component';

<template>
  <SomeComponent />
</template>
```

  <p>{{t 'nomenclature.nested-components.loose-mode' htmlSafe=true}}</p>

```hbs
<Nested::SomeComponent />
```

  </Section>

  <Section @id='namespaced-components'>
  </Section>

  <Section @id='arguments'>

```hbs
<SomeComponent @someArgument={{@anArgument}} />
```

<RefList as |x|>
  <x.guide @to="components/component-arguments-and-html-attributes/">
    {{t 'refs.guides.arguments' htmlSafe=true}}
  </x.guide>
</RefList>

  </Section>

  <Section @id='attributes'>

```hbs
<SomeComponent class="..." data-test style="..." />
<div class="...">
```

  <p>{{t 'nomenclature.attributes.splattributes' htmlSafe=true}}</p>

```hbs
<div ...attributes></div>
```

  </Section>

  <Section @id='this'>

```gjs
import Component from '@glimmer/component';

export default class Greeting extends Component {
  greeting = 'Hello';

  <template>
    {{this.greeting}}, {{@name}}!
  </template>
}
```

  </Section>

  <Section @id='block'>

  <p>{{t 'nomenclature.block.curly' htmlSafe=true}}</p>

```hbs
{{#let (array 1 2 3) as |threeItems|}}
  {{threeItems}}
{{/let}}
```

  <p>{{t 'nomenclature.block.component' htmlSafe=true}}</p>

```hbs
<MyComponent as |a b|>
  {{a}} {{b}}
</MyComponent>
```

  <p>{{t 'nomenclature.block.component-after' htmlSafe=true}}</p>

  </Section>

  <Section @id='named-block'>

```gjs
import Card from './card';

<template>
  <Card>
    <:header>Ember</:header>
    <:body>A framework for ambitious web developers.</:body>
  </Card>
</template>
```

  </Section>

  <Section @id='yield'>

```gjs
const Article = <template>
  <article>
    {{yield @title}}
  </article>
</template>;

<template>
  <Article @title="Hello" as |title|>
    <h1>{{title}}</h1>
  </Article>
</template>
```

<RefList as |x|>
  <x.guide @to="components/block-content/">
    {{t 'refs.guides.block-content' htmlSafe=true}}
  </x.guide>
</RefList>

  </Section>

</GuideSection>
