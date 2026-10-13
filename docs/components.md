---
imports:
  - import { t } from 'ember-intl';
  - import GuideSection from '#components/guide-section.gts';
  - import RefList from '#components/ref/list.gts';
---

<GuideSection @id='component-api' as |Section|>
  <Section @id='args'>

```gjs
import Component from '@glimmer/component';

export default class Greeting extends Component {
  get name() {
    return this.args.name ?? 'stranger';
  }

  <template>
    Hello, {{this.name}}! You are {{@age}} years old.
  </template>
}
```

  <p>{{t 'component-api.args.signature' htmlSafe=true}}</p>

```gts
import Component from '@glimmer/component';

interface Signature {
  Element: HTMLParagraphElement;
  Args: {
    age: number;
    name?: string;
  };
}

export default class Greeting extends Component<Signature> {
  <template>
    <p ...attributes>{{@name}} is {{@age}} years old.</p>
  </template>
}
```

<RefList as |x|>
  <x.guide @to="components/component-arguments-and-html-attributes/">
    {{t 'refs.guides.arguments' htmlSafe=true}}
  </x.guide>
</RefList>

  </Section>

  <Section @id='lifecycle'>

```gjs
import Component from '@glimmer/component';

export default class Clock extends Component {
  constructor(owner, args) {
    super(owner, args);

    // The component exists. Its arguments are ready. It has no DOM yet.
  }

  willDestroy() {
    super.willDestroy();

    // The component is no longer in use.
  }
}
```

  <p>{{t 'component-api.lifecycle.no-render-hooks' htmlSafe=true}}</p>

<RefList as |x|>
  <x.guide @to="components/template-lifecycle-dom-and-modifiers/">
    {{t 'refs.guides.template-lifecycle' htmlSafe=true}}
  </x.guide>
</RefList>

  </Section>
</GuideSection>

<GuideSection @id="components-how-to" as |Section|>
  <Section @id='access-args'>

```gjs
import Component from '@glimmer/component';

export default class LineItem extends Component {
  get total() {
    return this.args.price * this.args.quantity;
  }

  <template>
    {{@quantity}} × {{@price}} = {{this.total}}
  </template>
}
```

  </Section>

  <Section @id='update-args'>

```gjs
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

const Counter = <template>
  <button type="button" {{on "click" @onIncrement}}>
    {{@count}}
  </button>
</template>;

export default class Scoreboard extends Component {
  @tracked count = 0;

  increment = () => {
    this.count++;
  };

  <template>
    <Counter @count={{this.count}} @onIncrement={{this.increment}} />
  </template>
}
```

<RefList as |x|>
  <x.guide @to="components/component-state-and-actions/">
    {{t 'refs.guides.component-state' htmlSafe=true}}
  </x.guide>
</RefList>

  </Section>

  <Section @id='on-render'>

```gjs
import { modifier } from 'ember-modifier';

const autofocus = modifier((element) => {
  element.focus();
});

<template>
  <input {{autofocus}} />
</template>
```

  <p>{{t 'components-how-to.on-render.derive' htmlSafe=true}}</p>

  </Section>

  <Section @id='teardown'>

```gjs
import { modifier } from 'ember-modifier';

const onResize = modifier((element, [callback]) => {
  const observer = new ResizeObserver(callback);

  observer.observe(element);

  return () => observer.disconnect();
});

<template>
  <div {{onResize @onResize}}>
    {{yield}}
  </div>
</template>
```

  <p>{{t 'components-how-to.teardown.destructor' htmlSafe=true}}</p>

```gjs
import Component from '@glimmer/component';
import { registerDestructor } from '@ember/destroyable';

export default class Poller extends Component {
  constructor(owner, args) {
    super(owner, args);

    const interval = setInterval(() => this.args.onTick(), 1000);

    registerDestructor(this, () => clearInterval(interval));
  }
}
```

  </Section>

  <Section @id='when-property-changes'>

```gjs
import Component from '@glimmer/component';
import { cached, tracked } from '@glimmer/tracking';

export default class Search extends Component {
  @tracked query = '';

  @cached
  get results() {
    return this.args.items.filter((item) => item.name.includes(this.query));
  }

  updateQuery = (event) => {
    this.query = event.target.value;
  };

  <template>
    <input value={{this.query}} {{on "input" this.updateQuery}} />

    {{#each this.results as |item|}}
      {{item.name}}
    {{/each}}
  </template>
}
```

  <p>{{t 'components-how-to.when-property-changes.dom' htmlSafe=true}}</p>

```gjs
import { modifier } from 'ember-modifier';

const scrollTo = modifier((element, [position]) => {
  element.scrollTop = position;
});

<template>
  <div {{scrollTo @position}}>
    {{yield}}
  </div>
</template>
```

  </Section>

  <Section @id='get-element-reference'>

```gjs
import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';

export default class Player extends Component {
  video;

  setVideo = modifier((element) => {
    this.video = element;
  });

  play = () => {
    this.video.play();
  };

  <template>
    <video src={{@src}} {{this.setVideo}}></video>

    <button type="button" {{on "click" this.play}}>Play</button>
  </template>
}
```

  </Section>

  <Section @id='redirect'>

```gjs
import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class LogoutButton extends Component {
  @service router;

  logout = () => {
    this.router.transitionTo('login');
  };

  <template>
    <button type="button" {{on "click" this.logout}}>Log out</button>
  </template>
}
```

  <p>{{t 'components-how-to.redirect.link' htmlSafe=true}}</p>

```gjs
import { LinkTo } from '@ember/routing';

<template>
  <LinkTo @route="posts.show" @model={{@post}}>
    {{@post.title}}
  </LinkTo>
</template>
```

<RefList as |x|>
  <x.api @to="classes/RouterService">
    {{t 'refs.router-service' htmlSafe=true}}
  </x.api>
</RefList>

  </Section>

  <Section @id='handling-events'>

```gjs
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ProductList extends Component {
  @tracked selected;

  select = (product, event) => {
    event.preventDefault();

    this.selected = product;
  };

  <template>
    {{#each @products as |product|}}
      <a href="/products/{{product.id}}" {{on "click" (fn this.select product)}}>
        {{product.name}}
      </a>
    {{/each}}
  </template>
}
```

<RefList as |x|>
  <x.guide @to="components/component-state-and-actions/">
    {{t 'refs.guides.component-state' htmlSafe=true}}
  </x.guide>
</RefList>

  </Section>

  <Section @id='dynamic-components'>

```gjs
import Component from '@glimmer/component';

import ErrorMessage from './error-message';
import InfoMessage from './info-message';

const kinds = {
  error: ErrorMessage,
  info: InfoMessage,
};

export default class Message extends Component {
  get Kind() {
    return kinds[this.args.kind];
  }

  <template>
    <this.Kind class="message" {{on "click" @onDismiss}} />
  </template>
}
```

  <p>{{t 'components-how-to.dynamic-components.curly' htmlSafe=true}}</p>

```gjs
import Message from './message';

<template>
  {{#let (component Message kind="error") as |ErrorMessage|}}
    <ErrorMessage class="message" {{on "click" @onDismiss}} />
  {{/let}}
</template>
```

  </Section>
</GuideSection>

<GuideSection @id='component-patterns' as |Section|>
  <Section @id='provider'>

```gjs
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class Toggle extends Component {
  @tracked isOn = false;

  toggle = () => {
    this.isOn = !this.isOn;
  };

  <template>
    {{yield this.isOn this.toggle}}
  </template>
}
```

  <p>{{t 'component-patterns.provider.usage' htmlSafe=true}}</p>

```gjs
import Toggle from './toggle';

<template>
  <Toggle as |isOn toggle|>
    <button type="button" {{on "click" toggle}}>
      {{if isOn "On" "Off"}}
    </button>
  </Toggle>
</template>
```

  </Section>

  <Section @id='template-only'>

```gjs
<template>
  <span class="badge" ...attributes>
    {{@label}}
  </span>
</template>
```

  <p>{{t 'component-patterns.template-only.local' htmlSafe=true}}</p>

```gjs
const Badge = <template>
  <span class="badge">{{@label}}</span>
</template>;

<template>
  <Badge @label="New" />
  <Badge @label="Sale" />
</template>
```

  </Section>

  <Section @id='named-blocks'>

```gjs
<template>
  <section class="card">
    {{#if (has-block "header")}}
      <header>{{yield to="header"}}</header>
    {{/if}}

    <div class="body">
      {{yield to="body"}}
    </div>
  </section>
</template>
```

  <p>{{t 'component-patterns.named-blocks.usage' htmlSafe=true}}</p>

```gjs
import Card from './card';

<template>
  <Card>
    <:header>Ember</:header>
    <:body>A framework for ambitious web developers.</:body>
  </Card>
</template>
```

<RefList as |x|>
  <x.guide @to="components/block-content/">
    {{t 'refs.guides.block-content' htmlSafe=true}}
  </x.guide>
</RefList>

  </Section>

  <Section @id='contextual'>

```gjs
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

const Tab = <template>
  <button
    type="button"
    class={{if (eq @name @active) "active"}}
    {{on "click" (fn @onSelect @name)}}
  >
    {{yield}}
  </button>
</template>;

export default class Tabs extends Component {
  @tracked active = this.args.initial;

  select = (name) => {
    this.active = name;
  };

  <template>
    {{yield (hash Tab=(component Tab active=this.active onSelect=this.select))}}
  </template>
}
```

  <p>{{t 'component-patterns.contextual.usage' htmlSafe=true}}</p>

```gjs
import Tabs from './tabs';

<template>
  <Tabs @initial="one" as |tabs|>
    <tabs.Tab @name="one">One</tabs.Tab>
    <tabs.Tab @name="two">Two</tabs.Tab>
  </Tabs>
</template>
```

  </Section>
</GuideSection>
