---
imports:
  - import { t } from 'ember-intl';
  - import GuideSection from '#components/guide-section.gts';
  - import RefList from '#components/ref/list.gts';
---

<GuideSection @id='template' as |Section|>
  <Section @id='grammar'>

```typescript
type Value = string | number | null | undefined | object | Value[];
type Helper = Function | EmberHelper | EmberModifier;
type NamedArgs = Key + '=' + SExpression
type SExpression =
  | Value
  | `(` + Helper + `)`
  | `(` + Helper + ...SExpression + `)`
  | `(` + Helper + ...SExpression + ...NamedArgs + `)`

type Moustache = `{{` + SExpression + `}}`
```

  <p>{{t 'template.grammar.plain-function' htmlSafe=true}}</p>

```hbs
<div>
    {{a b c d=e}}
{{!-- │ │ │ │ └─── value / s-expression
      │ │ │ └─── named argument key
      │ │ └─── positional argument
      │ └─── positional argument
      └─── helper --}}
</div>
```

  <p>{{t 'template.grammar.expression-breakdown' htmlSafe=true}}</p>

  </Section>

  <Section @id='notation'>

```hbs
{{or argA (not argB)}}

{{functionA argA argB argC=(functionB argD)}}
```

  <p>{{t 'template.notation.js-equiv'}}</p>

```js
argA || !argB;

functionA(argA, argB, { argC: functionB(argD) });
```

  <p>{{t 'template.notation.notes' htmlSafe=true}}</p>

  </Section>

  <Section @id='syntax'>

```hbs
<div {{modifierName a b=(helperName c)}}>
  {{yield to="default"}}
</div>
```

  <p>{{t 'template.syntax.with-this' htmlSafe=true}}</p>

```hbs
<div {{this.modifierName a b=(this.helperName c)}}>
{{!--  │                 │ │  │               └─── positional argument
       │                 │ │  └─── helper
       │                 │ └─── named argument key
       │                 └─── positional argument
       └─── modifier --}}
  {{yield to="default"}}
{{!--  │  │   └─── value
       │  └─── named argument key
       └─── helper --}}
</div>

<div {{@modifierName a b=(@helperName c)}}>
{{!--  │             │ │  │           └─── positional argument
       │             │ │  └─── helper
       │             │ └─── named argument key
       │             └─── positional argument
       └─── modifier --}}
  {{yield to="default"}}
{{!--  │  │   └─── value
       │  └─── named argument key
       └─── helper --}}
</div>
```

  </Section>

  <Section @id='built-ins'>

```gjs
<template>
  {{#if (and @isAdmin (not @isLocked))}}
    <button type="button" {{on "click" (fn @onDelete @user)}}>
      Delete
    </button>
  {{/if}}
</template>
```

  <p>{{t 'template.built-ins.imports' htmlSafe=true}}</p>

```gjs
import { concat, get, uniqueId } from '@ember/helper';

<template>
  {{#let (uniqueId) as |id|}}
    <label for={{id}}>{{get @labels @field}}</label>
    <input id={{id}} class={{concat "field-" @field}} />
  {{/let}}
</template>
```

<RefList as |x|>
  <x.api @to="modules/@ember%2Fhelper">
    {{t 'refs.helper-module' htmlSafe=true}}
  </x.api>
</RefList>

  </Section>
</GuideSection>

<GuideSection @id="templates-how-to" as |Section|>
  <Section @id="iterate">

```hbs
{{#each this.anIterable as |item index|}}
  {{index}}: {{item}}
{{else}}
  The list is empty.
{{/each}}
```

  <p>{{t 'templates-how-to.iterate.key' htmlSafe=true}}</p>

```hbs
{{#each this.anIterable key='uuid' as |item|}}
  {{item.name}}
{{/each}}
```

  <p>{{t 'templates-how-to.iterate.each-in' htmlSafe=true}}</p>

```hbs
{{#each-in this.anObject as |key value|}}
  {{key}}: {{value}}
{{/each-in}}
```

<RefList as |x|>
  <x.guide @to="components/looping-through-lists/">
    {{t 'refs.guides.looping' htmlSafe=true}}
  </x.guide>
</RefList>

  </Section>

  <Section @id="invoke-function">

```gjs
import Price from './price';

const formatPrice = (cents, currency = 'USD') => {
  const format = new Intl.NumberFormat('en-US', { style: 'currency', currency });

  return format.format(cents / 100);
};

<template>
  {{formatPrice @cents}}
  {{formatPrice @cents "EUR"}}

  <Price @label={{formatPrice @cents}} />
</template>
```

  <p>{{t 'templates-how-to.invoke-function.no-arguments' htmlSafe=true}}</p>

```hbs
{{(this.myFunction)}}

<Price @label={{(this.myFunction)}} />
```

<RefList as |x|>
  <x.guide @to="components/helper-functions/">
    {{t 'refs.guides.helper-functions' htmlSafe=true}}
  </x.guide>
</RefList>

  </Section>

  <Section @id="access-properties">

```hbs
{{@argumentA}}
{{@user.address.city}}
{{this.property}}
```

  <p>{{t 'templates-how-to.access-properties.dynamic' htmlSafe=true}}</p>

```gjs
import { get } from '@ember/helper';

<template>
  {{get @argObject 'property-name'}}
  {{get @argObject @dynamicProperty}}
</template>
```

  </Section>

  <Section @id="access-array-indices">

```gjs
import { get } from '@ember/helper';

<template>
  {{get @someArray 0}}
  {{get @someArray @index}}
</template>
```

  </Section>

  <Section @id="conditions">

```hbs
{{#if this.condition}}
  ...
{{else if this.otherCondition}}
  ...
{{else}}
  ...
{{/if}}
```

```hbs
{{#unless this.condition}}
  ...
{{/unless}}
```

  <p>{{t 'templates-how-to.conditions.inline' htmlSafe=true}}</p>

```hbs
<div class={{if @isActive "active" "inactive"}}>
  {{if @name @name "No name"}}
</div>
```

  <p>{{t 'templates-how-to.conditions.operators' htmlSafe=true}}</p>

```hbs
{{#if (eq @a @b)}}
  ...
{{/if}}

{{#if (or (eq @a @b) (gt @c 0))}}
  ...
{{/if}}

{{if (and @a (not @b)) "is true" "is false"}}
```

<RefList as |x|>
  <x.guide @to="components/conditional-content/">
    {{t 'refs.guides.conditional-content' htmlSafe=true}}
  </x.guide>
  <x.rfc @id="560" />
  <x.rfc @id="562" />
</RefList>

  </Section>

  <Section @id="define-variables">

```hbs
{{#let (array 1 2 3) as |list|}}
  {{#each list as |number|}}
    {{number}}
  {{/each}}
{{/let}}
```

  <p>{{t 'templates-how-to.define-variables.example' htmlSafe=true}}</p>

  <p>{{t 'templates-how-to.define-variables.javascript' htmlSafe=true}}</p>

```gjs
const list = [1, 2, 3];

<template>
  {{#each list as |number|}}
    {{number}}
  {{/each}}
</template>
```

<RefList as |x|>
  <x.api @to="classes/Ember.Templates.helpers/methods/let?anchor=let">
    {{t 'refs.let' htmlSafe=true}}
  </x.api>
  <x.api @to="classes/Ember.Templates.helpers/methods/array?anchor=array">
    {{t 'refs.array' htmlSafe=true}}
  </x.api>
</RefList>

  </Section>

  <Section @id="math">

```gjs
const add = (a, b) => a + b;

<template>
  {{add @count 1}}

  {{#if (gt @count 10)}}
    More than ten.
  {{else if (lte @count 0)}}
    None.
  {{/if}}
</template>
```

<RefList as |x|>
  <x.rfc @id="561" />
</RefList>

  </Section>

</GuideSection>
