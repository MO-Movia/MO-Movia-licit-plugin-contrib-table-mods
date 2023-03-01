import {Node, NodeSpec} from 'prosemirror-model';

export const TableCellNodeSpec = (nodespec: NodeSpec) =>
  Object.assign({}, nodespec, {
    attrs: Object.assign({}, nodespec.attrs, {
      fullSize: {default: 0},
    }),
    parseDOM: [
      {
        tag: 'td',
        getAttrs: (dom: HTMLElement) => {
          const attrFS = dom.getAttribute('fullSize');
          let fullSize = 0;
          if (attrFS) {
            fullSize = parseInt(attrFS);
          }
          return Object.assign({}, nodespec.parseDOM[0].getAttrs(dom), {
            fullSize: fullSize,
          });
        },
      },
    ],
    toDOM(node: Node): Array<unknown> {
      const base = nodespec.toDOM(node);
      let style = '';
      if (Array.isArray(base) && 1 < base.length && base[1].style) {
        style = base[1].style;
      }

      if (node.attrs.fullSize) {
        base[1].style = style + 'padding:0;margin:0;';
      }

      base[1].fullSize = node.attrs.fullSize;

      return base as unknown as Array<unknown>;
    },
  });

export default TableCellNodeSpec;
