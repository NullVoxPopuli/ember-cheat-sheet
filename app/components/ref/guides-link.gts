import type { TOC } from "@ember/component/template-only";

const GuidesLink: TOC<{
  Args: {
    /**
     * The path after `https://guides.emberjs.com/release/`.
     */
    to: string;
  };
  Blocks: {
    default: [];
  };
}> = <template>
  <li>
    <a href="https://guides.emberjs.com/release/{{@to}}" target="_blank" rel="noreferrer noopener">
      {{yield}}
    </a>
  </li>
</template>;

export default GuidesLink;
