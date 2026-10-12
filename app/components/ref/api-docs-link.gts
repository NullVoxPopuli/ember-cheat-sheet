import type { TOC } from "@ember/component/template-only";

const ApiDocsLink: TOC<{
  Args: {
    /**
     * The path after `https://api.emberjs.com/ember/release/`.
     */
    to: string;
  };
  Blocks: {
    default: [];
  };
}> = <template>
  <li>
    <a
      href="https://api.emberjs.com/ember/release/{{@to}}"
      target="_blank"
      rel="noreferrer noopener"
    >
      {{yield}}
    </a>
  </li>
</template>;

export default ApiDocsLink;
