# Table Extension ProseMirror Plugin For Licit

Some modification to the PM Tables capabilities that allows the removal of padding and margins to allow better fitment of images inside of a table cell.

## Build

### Dependency

### Commands

- npm ci

- npm pack

#### To use this in Licit

Include plugin in licit component

- import TableExtensionPlugin

- add TableExtensionPlugin array in licit's plugin array

```

import { TableExtensionPlugin }  from  '@modusoperandi/licit-table-mods';


const  plugins = [new TableExtensionPlugin()]

ReactDOM.render(<Licit docID={0} plugins={plugins}/>


```
