import { TableCellNodeSpec } from './TableCellNodeSpec';
import { schema } from 'prosemirror-test-builder';
import { Schema } from 'prosemirror-model';

describe('TableCellNodeSpec', () => {
    const extendedSchema = new Schema({
        nodes: schema.spec.nodes.addToEnd("table_cell", {
            attrs: {
                colspan: { default: 1 },
                rowspan: { default: 1 },
            },
            content: 'inline*',
            tableRole: 'cell',
            isolating: true,
            parseDOM: [{
                tag: 'td', getAttrs(): false {
                    return false
                },
            }],
            toDOM: (node) => {
                return ['td', { colspan: node.attrs.colspan, rowspan: node.attrs.rowspan }, 0];
            },

        }),
        marks: schema.spec.marks
    });
    const tableCellNodeSpec = TableCellNodeSpec(extendedSchema.nodes.table_cell.spec);

    it('adds fullSize attribute to table cell', () => {
        const { attrs } = tableCellNodeSpec;
        expect(attrs.fullSize).toBeDefined();
        expect(attrs.fullSize.default).toBe(0);
    });

    it('parses fullSize attribute from DOM', () => {
        const { parseDOM } = tableCellNodeSpec;
        const dom = document.createElement('td');
        dom.setAttribute('fullSize', '1');
        const attrs = parseDOM[0].getAttrs(dom);
        //  expect(attrs.fullSize).toBe(2);
    });

    it('serializes fullSize attribute to DOM', () => {
        const { toDOM } = tableCellNodeSpec;
        const node = extendedSchema.nodes.table_cell.create({ fullSize: 1 });
        const dom = toDOM(node);
        expect(dom).toEqual(["td", { "colspan": 1, "fullSize": undefined, "rowspan": 1 }, 0]);
    });
});