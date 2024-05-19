# @ouroboros/define-mui

[![npm version](https://img.shields.io/npm/v/@ouroboros/define-mui.svg)](https://www.npmjs.com/package/@ouroboros/define-mui) ![MIT License](https://img.shields.io/npm/l/@ouroboros/define-mui.svg)

Define-MUI generates Forms and Results tables using [@ouroboros/define](https://www.npmjs.com/package/@ouroboros/define) files to describe the data, and [Material-UI](https://mui.com/material-ui/) components to generate the HTML.

## Install
```bash
npm install @ouroboros/define-mui
```

## Using

It is strongly recommended that before using this library you fully understand how Define definitions work. Full explanation for data structures built using Define can be found at [ouroboroscoding.com/define](https://ouroboroscoding.com/define).

## \_\_ui\_\_

Define-MUI extends definition files by adding the special field \_\_ui\_\_ to both parents and nodes.

### Tree / Parent UI

| Node | Type | Description |
| ---- | ---- | ----------- |
| [\_\_create\_\_](#__ui____create__) | string[] | The list, and order, of nodes to display in a `create` Form. |
| [\_\_order\_\_](#__ui____order__) | string[] | The list, and order, of nodes to display as a default for all class types. |
| [\_\_primary\_\_](#__ui____primary__) | string | The name of the node that represents the primary key in the record. |
| [\_\_results\_\_](#__ui____results__) | string[] | The list, and order, of nodes to display in each Result row. |
| [\_\_update\_\_](#__ui____update__) | string[] | The list, and order, of nodes to display in an `update` Form. |

#### \_\_ui\_\_.\_\_create\_\_

Allows a custom list of nodes, and the order of those nodes, in a `create` Form instead of showing every node in the same order as in the definition.

```json
{
	"__name__": "user",
	"__ui__": {
		"__create__": [
			"email",
			"passwd",
			"first_name",
			"last_name"
		]
	}
}
```

#### \_\_ui\_\_.\_\_order\_\_

Allows a custom list of nodes, and the order of those nodes,
Allows a custom list of nodes, and the order of those nodes, to display in a `create` Form if \_\_create\_\_ is not set, in an `update` Form if \_\_update\_\_ is not set, and in a Result row if \_\_results\_\_ is not set.

```json
{
	"__name__": "user",
	"__ui__": {
		"__order__": [
			"email",
			"first_name",
			"last_name"
		]
	}
}
```

#### \_\_ui\_\_.\_\_primary\_\_

Allows setting the name of the node that acts as the primary key of the record, by default `_id` is used.

```json
{
	"__name__": "user",
	"__ui__": {
		"__primary__": "id"
	}
}
```

#### \_\_ui\_\_.\_\_results\_\_

Allows a custom list of nodes, and the order of those nodes, in a Result row instead of showing every node in the same order as in the definition.

```json
{
	"__name__": "user",
	"__ui__": {
		"__primary__": "id",
		"__results__": [
			"id",
			"created",
			"email"
		]
	}
}
```

#### \_\_ui\_\_.\_\_update\_\_

Allows a custom list of nodes, and the order of those nodes, in a `update` Form instead of showing every node in the same order as in the definition.

```json
{
	"__name__": "user",
	"__ui__": {
		"__update__": [
			"email",
			"first_name",
			"last_name"
		]
	}
}
```

### Node UI

| Node | Type | Description |
| ---- | ---- | ----------- |
| [\_\_adornment\_\_](#__ui____adornment__) | string | Character or string to put before field data, only used in `price` node |
| [\_\_default\_\_](#__ui____default__) | any | The default value to set for the node in the case of a `create` form |
| [\_\_errors\_\_](#__ui____errors__) | object | Error message codes or short strings mapped to more descriptive error messages we want to display |
| [\_\_extra_space\_\_](#__ui____extra_space__) | bool | Set to add an extra space after commas in `multiselectcsv` node |
| [\_\_maximum\_\_](#__ui____maximum__) | number | Limits the number of characters for `text` and `textarea` types |
| [\_\_options\_\_](#__ui____options__) | Subscribe \| [string, string][] \| string[] | Options to use in generating options for `select` and checkboxes for `multiselectcsv` |
| [\_\_regex\_\_](#__ui____regex__) | RegExp \| string | Regular expression to validate `text` types |
| [\_\_title\_\_](#__ui____title__) | string | The title / placeholder to display with inputs |
| [\_\_type\_\_](#__ui____type__) | string | The type of input to use to override the default based on the Node's default type |

#### \_\_ui\_\_.\_\_adornment\_\_

Useful for `price` types if we want to change the default $ to another monetary symbol, for example €.

```json
{
	"cost": {
		"__type__": "price",
		"__ui__": {
			"__adornment__": "€"
		}
	}
}
```

#### \_\_ui\_\_.\_\_default\_\_

The default used instead of null when creating nodes on `create` Forms.

```json
{
	"subscribe": {
		"__type__": "bool",
		"__ui__": {
			"__default__": true
		}
	}
}
```

#### \_\_ui\_\_.\_\_errors\_\_

An object containing simple error messages received from the system mapped to more complex descriptions.

```json
{
	"passwd": {
		"__type__": "string",
		"__ui__": {
			"__type__": "password",
			"__errors__": {
				"invalid": "Password requires 8 characters with one uppercase and one lower case letter as well as one number.",
				"missing": "Password is a required"
			}
		}
	}
}
```

#### \_\_ui\_\_.\_\_extra_space\_\_

In the case of `multiselectcsv` types, the data is stored by default with no spaces, i.e. "one,two,three". Set the extra space field to `true` in order to make it return data like "one, two, three".

```json
{
	"country": {
		"__type__": "string",
		"__ui__": {
			"__type__": "multiselectcsv",
			"__options__": [ "Canada", "Mexico", "United States" ],
			"__extra_space__": true
		}
	}
}
```

#### \_\_ui\_\_.\_\_maximum\_\_

Useful if we need to limit the maximum characters a text node can accept.

```json
{
	"name": {
		"__type__": "string",
		"__ui__": {
			"__maximum__": 32
		}
	}
}
```

#### \_\_ui\_\_.\_\_options\_\_

Allows setting static options for a node if none are present in the primary data, or if we want to create more descriptive options, or if the data is dynamic and requires being pulled or pushed from another source. The last only being available at runtime via Subscribe models and not via JSON definition files.

```json
{
	"name": {
		"__type__": "string",
		"__ui__": {
			"__type__": "select",
			"__options__": [
				[ "CA", "Canada" ],
				[ "MX", "Mexico" ],
				[ "US", "United States" ]
			]
		}
	}
}
```

#### \_\_ui\_\_.\_\_regex\_\_

Use a regular expression to validate whether data is correct, overriding any validation done on the value itself. Useful for data which may be stored in a DB as one type, hash data, but be entered in another type, plain text. A good example of this is a password.

```json
{
	"passwd": {
		"__type__": "md5",
		"__ui__": {
			"__type__": "password",
			"__regex__": "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
		}
	}
}
```

#### \_\_ui\_\_.\_\_title\_\_

The title of the node, used to display a label above, or a placeholder within, depending on the variant prop sent to the Node.

```json
{
	"first_name": {
		"__type__": "string",
		"__ui__": {
			"__title__": "Given Name"
		}
	}
}
```

#### \_\_ui\_\_.\_\_type\_\_

The type of input to use to gather the information. Define-MUI comes with several built in types, most of which are decided based on the primary type of the node. However, as new types can be added using the `pluginAdd(name: string, component: DefineBase)` available on all define classes, you can also override this to map it to whatever type is appropriate.

Here are the built in types:

| Type | Description |
| ---- | ----------- |
| bool | Displays a checkbox with `true` being checked, and `false` being unchecked. |
| date | Displays an input element with type 'date'. |
| datetime | Displays two input elements side by side, one a 'date', the other a 'time' type. Stores the data as a single string, e.g. '1981-05-02 12:23:00'. |
| hidden | Generates an input element with 'hidden' type for non-visible data. |
| multiselectcsv | Displayed a field which when clicked opens a popup allowing selection of all available options, which is then stored in a csv format with all checked options. |
| number | Displays an input element of type 'number'. |
| password | Displays an input element of type 'password'. |
| phone_number | Diplays a PhoneInput from the library react-phone-input-material-ui. |
| price | Displays an input element of type 'text' with a special adornment before any text. |
| select | Displays a select element using \_\_options\_\_ values to generate the option elements. |
| text | Displays an input element of type 'text' |
| textarea | Displays a textarea element |
| time | Displays an input element of type 'time' |
| timestamp | Displays two input elements side by side, one a 'date', the other a 'time' type. Stores the value as a number, e.g. 357668580. |

## Form

### Simple Example
`definition.json`
```json
{
	"__name__": "Example",

	"id": {
		"__type__": "uuid",
		"__optional__": true
	},

	"created": {
		"__type__": "timestamp",
		"__optional__": true
	},

	"string": {
		"__type__": "string",
		"__maximum__": 32
	},

	"int": {
		"__type__": "int",
		"__miniumum__": 10,
		"__maximum__": 20
	},

	"date": {
		"__type__": "date",
		"__minumum__": "2024-01-01",
		"__optional__": true
	},

	"select": {
		"__type__": "string",
		"__options__": [ "one", "two", "three" ]
	},

	"bool": {
		"__type__": "bool"
	}
}
```

Here we have a simple example of a definition file using some standard types. We will use it to generate a simple Form to create new records.

`FormSimple.js`
```JSX
// Imports
import { timestamp } from '@ouroboros/dates';
import { Tree } from '@ouroboros/define';
import { Form } from '@ouroboros/define-mui';
import React from 'react';
import { v4 } from 'uuid';

// Definition
import ExampleDef from 'example.json';

// Create the tree instance and merge it with UI specific info,
//	in this case, the list of fields from the definition we
//	want to see in the Form
const ExampleTree = new Tree(ExampleDef, {
	__ui__: {
		__create__: [ 'string', 'int', 'date', 'select', 'bool' ]
	}
});

// Component
export default function FormSimple(props) {
	return (
		<Form
			onSubmit={(value) => console.log(value)}
			tree={ExampleTree}
			type="create"
		/>
	);
}
```

This would generate a simple form like below

![FormSimple-0](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/FormSimple-0.png)

If we entered in some data:

![FormSimple-1](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/FormSimple-1.png)

And hit the "CREATE" button to trigger our `onSubmit` callback, which in this case just calls console.log with the record from the form:

![FormSimple-2](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/FormSimple-2.png)

### Form props

| Name    | Type   | Default | Description |
| ------- | ------ | ------- | ----------- |
| [display](#formdisplay) | object | null | Used to set the fields that can be displayed without having to alter the [\_\_ui\_\_](#__ui__) special fields in the definition. |
| [dynamicOptions](#formdynamicOptions) | object[] | null | A list of nodes `node` that will receive new options `options` based on the change of another node `trigger`. |
| [fields](#formfields) | string[] | All nodes in the same order as the Tree was created | The list, and order, of fields to be displayed in the Form. |
| [gridSizes](#formgridsizes) | { [node]: { xs, sm, md, lg, xl } } | { \_\_default\_\_: { xs: 12, sm: 6, lg: 3 } } | Allows custom mapping of the grid sizes per node. \_\_default\_\_ value is assigned to all nodes that aren't specified directly. If not set, all nodes will be on their own line across all 12 grid boxes if the screen is extra small, 2 on each line if the screen is small (12 / 2), and 4 on each line if the screen is large or larger (12 / 3). |
| [gridSpacing](#formgridSpacing) | number | 2 | Defines the spacing between grid items. |
| [label](#formlabel) | 'above' \| 'none' \| 'placeholder' | 'placeholder' | Where to display the title, above the input, within the input, or not at all. |
| [onCancel](#formoncancel) | function | null | Called when the cancel button on the form is pressed. |
| [onNodeChange](#formonnodechange) | object | null | Useful for triggering code based on a nodes value changing. Callback receives the full record of all data, the name of the node that triggered, and the value that node was before it was changed. |
| [onSubmit](#formonsubmit) | function | required | The function called when the submit button on the form is pressed, assuming the data in the form is valid. Receives the value of the record, as well as the primary key if one exists. |
| [title](#formtitle) | string \| boolean | false | The title to put above the form. |
| [tree](#formtree) | Tree | required | The instance of the Tree which will be used to generate the form as well as validate the data in it. |
| [type](#formtype) | 'create' \| 'update' | required | The type of Form, `create` types return all record data on submit, `update` types on return the fields that have changed on submit. |
| [value](#formvalue) | object | {} | The record data, useful for initially setting values in `create` types, and for setting existing data in `update` types. |
| [variant](#formvariant) | 'filled' \| 'outlined' \| 'standard' | 'outlined' | The Material-UI input display type. |

#### Form.display

The display prop is used to allow a way to override \_\_ui\_\_ values set in the defintion or the instance. Individual nodes can be set by passing the node name at the same level as the Parent \_\_ui\_\_ values. For example, what if we want to specify specific nodes for the Form, and also set the title and type for Node?

`FormDisplay.js`
```JSX
// Imports
import { Tree } from '@ouroboros/define';
import { Form } from '@ouroboros/define-mui';
import React from 'react';

// Tree
const ExampleTree = new Tree({
	__name__: 'address',
	__ui__: {
		__order__: [
			'id', 'line1', 'line2', 'city',
			'division', 'country'
		]
	},
	line1: 'string',
	line2: 'string',
	city: 'string',
	division: 'string',
	country: {
		__type__: 'string',
		__regex__: '[A-Z]{2}'
	}
});

// Component
export default function FormDisplay(props) {
	return (
		<Form
			display={{
				__create__: [
					'country', 'division',
					'line1', 'line2', 'city'
				],
				line1: {
					__title__: 'Address'
				},
				line2: {
					__title__: 'Suite / Office / Apartment'
				},
				division: {
					__title__: 'State'
				},
				country: {
					__type__: 'select',
					__options__: [
						[ 'CA', 'Canada' ],
						[ 'MX', 'Mexico' ],
						[ 'US', 'United States' ]
					]
				}
			}}
			onSubmit={value => console.log(value)}
			tree={ExampleTree}
			type="create"
		/>
	);
}
```

As we can see from the screenshot below, the country and division are now displayed first in the order, the country is displayed as a select box with 3 options, again, displaying human readable country names, though storing them as 2 character strings, and each node has an appropriate human readable title.

![FormDisplay-0](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/FormDisplay-0.png)

For a full description of the \_\_ui\_\_ types that can be set, please view the [Tree / Parent UI](#tree--parent-ui) and [Node UI](#node-ui) sections.

#### Form.dynamicOptions

Dynamic options are useful for nodes whose options will change based on the values of other fields.

`FormDynamicOptions.js`
```JSX
// Imports
import { Tree } from '@ouroboros/define';
import { Form } from '@ouroboros/define-mui';
import React from 'react';

// Divisions
import DIVISIONS from 'divisions';

// Tree
const ExampleTree = new Tree({
	__name__: 'address',
	division: {
		__type__: 'string',
		__regex__: '[A-Z]{2}',
		__ui__: {
			__type__: 'select'
		}
	},
	country: {
		__type__: 'string',
		__regex__: '[A-Z]{2}',
		__ui__: {
			__type__: 'select',
			__options__: [
				[ 'CA', 'Canada' ],
				[ 'MX', 'Mexico' ],
				[ 'US', 'United States' ]
			]
		}
	}
});

// Component
export default function FormDynamicOptions(props) {
	return (
		<Form
			dynamicOptions={ [ {
				node: 'division',
				trigger: 'country',
				options: DIVISIONS
			} ] }
			onSubmit={value => console.log(value)}
			tree={ExampleTree}
			type="create"
		/>
	);
}
```

Country / Division is a perfect example for this, as you do not want to force the user to wade through potentially thousands of entries to find the right State / Province / Division, it's much better to allow the options to change dynamically based on the country selected.

![FormDyanmicOptions-0](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/FormDynamicOptions-0.gif)

#### Form.fields

This is a shortcut for \_\_ui\_\_.\_\_create\_\_, \_\_ui\_\_.\_\_order\_\_, and \_\_ui\_\_.\_\_update\_\_ or the equivalent Form.display.\_\_create\_\_, Form.display.\_\_order\_\_, and Form.display.\_\_update\_\_.

#### Form.gridSizes

gridSizes is useful for altering the size of each node and fitting more than a handful on one line if they are meant to be small. It can make the display considerably more user friendly.

`FormGridSizes.js`
```JSX
// Imports
import { Tree } from '@ouroboros/define';
import { Form } from '@ouroboros/define-mui';
import React from 'react';

// Tree
const ExampleTree = new Tree({
	__name__: 'address',
	line1: 'string',
	line2: 'string',
	city: 'string',
	division: 'string',
	country: 'string'
});

// Component
export default function FormGridSizes(props) {
	return (
		<Form
			gridSizes={ {
				line1: { xs: 9 },
				line2: { xs: 3 },
				city: { xs: 12, sm: 6 },
				division: { xs: 6, sm: 3 },
				country: { xs: 6, sm: 3 }
			} }
			onSubmit={value => console.log(value)}
			tree={ExampleTree}
			type="create"
		/>
	);
}
```

As we can see below, on a small size screen, the first two nodes use the first row, and the last three nodes use the second line.

![FormGridSizes-0](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/FormGridSizes-0.png)

But on an extra small screen, the first two nodes still take up the first line, but only the third node is on the second line, and the last two are on the third line.

![FormGridSizes-1](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/FormGridSizes-1.png)

This way we can customize the look of the form for phones, tablets, or desktops. For a more detailed explanation, check the page for [Material-UI's Grid](https://mui.com/material-ui/react-grid/) component.

#### Form.gridSpacing

gridSpacing is used to define the space between the grids. Check the page for [Material-UI's Grid](https://mui.com/material-ui/react-grid/) component.

#### Form.label

Used to set where to display the label for each node.

`FormLabel.js`
```JSX
// Imports
import { Tree } from '@ouroboros/define';
import { Form } from '@ouroboros/define-mui';
import React from 'react';

// Tree
const ExampleTree = new Tree({
	__name__: 'address',
	line1: 'string',
	line2: 'string',
	city: 'string',
	division: 'string',
	country: 'string'
});

// Component
export default function FormLabel(props) {
	return (
		<Form
			label="above"
			onSubmit={value => console.log(value)}
			tree={ExampleTree}
			type="create"
		/>
	);
}
```

##### Form.label.above

![FormLabel-0](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/FormLabel-0.png)

##### Form.label.placeholder

![FormLabel-1](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/FormLabel-1.png)

##### Form.label.none

![FormLabel-2](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/FormLabel-2.png)

Although on the surface it seems useless to set this to "none", power users can create their own form types using the DefineParent and DefineNode classes and may whish to show labels / titles with images or some other method. Setting `label` to "none" allows for this.

#### Form.onCancel

`() => void`

Useful if the Form can be hidden or reset. Adds a "Cancel" button that will trigger the callback.

`FormOnCancel.js`
```JSX
// Imports
import { Tree } from '@ouroboros/define';
import { Form } from '@ouroboros/define-mui';
import React, { useState } from 'react';

// Tree
const ExampleTree = new Tree({
	__name__: 'address',
	division: 'string',
	country: 'string'
});

// Component
export default function FormOnCancel(props) {
	const [ open, openSet ] = useState(true);

	if(!open) {
		return null;
	}

	return (
		<Form
			onCancel={() => openSet(false)}
			onSubmit={value => console.log(value)}
			tree={ExampleTree}
			type="create"
		/>
	);
}
```

![FormOnCancel-0](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/FormOnCancel-0.png)

#### Form.onNodeChange

Sometimes we want to modify one or more fields in a record based on changes in another field. `onNodeChange` allows for this by setting triggers on nodes which can return changes to the record. The callback per node is as follows:

`(event: ParentChangeEvent, ) => void | object`

A change event has the following elements:

| Name | Type | Description |
| ---- | ---- | ----------- |
| data | object | The current state of the record within the Form. |
| node | string | The name of the node which changed. |
| oldValue | any | The value of the node before it changed. |

Let's say we want to make a URL slug value based on the title.

`FormOnNodeChange.js`
```JSX
// Imports
import { Tree } from '@ouroboros/define';
import { Form } from '@ouroboros/define-mui';
import { normalize } from '@ouroboros/tools';
import React from 'react';

// Tree
const ExampleTree = new Tree({
	__name__: 'post',
	title: 'string',
	slug: 'string'
});

// Constants
const TITLE_TO_SLUG = /[a-z0-9-]/;

// Component
export default function FormOnNodeChange(data) {
	function titleChanged(ev) {
		const s = normalize(ev.data.title).toLowerCase();
		const l = [];
		for(const c of s.split('')) {
			if (c === ' ') {
				l.push('-');
			} else if (TITLE_TO_SLUG.test(c)) {
				l.push(c);
			}
		}
		return {
			'slug': l.join('')
		}
	}

	return (
		<Form
			onNodeChange={{ title: titleChanged }}
			onSubmit={value => console.log(value)}
			tree={ExampleTree}
			type="create"
		/>
	);
}
```

We get the event in titleChanged, take the title field, clean it up and remove special characters, then return a new object with the new value as the slug field. This new object will be merged with the existing record so that we can see the changes immediately.

![FormOnNodeChange-0](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/FormOnNodeChange-0.gif)

#### Form.onSubmit

`(value: object, key: string) => boolean | string[][] | Promise<boolean>`

Callback for when the user clicks the "create" or "update" button based on the type. Receives one or two arguments. The first `value` is the data associated with the Form that the user has entered, the second `key` is the value of the primary key, assuming one exists in the record and is defined. By default define assumes all records have a primary key called `_id`, but this can be overwritten using the \_\_ui\_\_.\_\_primary\_\_ value.

`value` is an object where each key is the node, and each value is the current value of that node. For `create` types, all nodes that have been filled in are returned. For `update` types, only the nodes that have been changed since the Form was loaded will be returned.

`key` is useful for `update` types which are generic, as the primary key not changing means it will not be present in `value`, but we will still need to know what it is for the sake of updating the data somehow.

This callback can, and should, return `true` if the submission was successful, or else a list of errors in the same format as [@ouroboros/define's errors](https://ouroboroscoding.com/define/#platform=javascript&page=errors), allowing for the Form to add error messages below each Node that failed. While it's true that Form itself won't call onSubmit if any of the fields are invalid, other issues can arise, for example, a unique value being used twice, or the DB somehow failing. At minimum, you should return `true` on success so that any existing error messages are cleared.

For a better understanding of onSubmit, check the [Putting it all Together](#puttingitalltogether) section further down.

#### Form.title

If passed as a string, sets the title of the Form along the top, if set to `true` it uses the type and the \_\_name\_\_ of the Tree to generate the string.

`FormTitle.js`
```JSX
// Imports
import { Tree } from '@ouroboros/define';
import { Form } from '@ouroboros/define-mui';
import React from 'react';

// Tree
const ExampleTree = new Tree({
	__name__: 'address',
	division: 'string',
	country: 'string'
});

// Component
export default function FormTitle(props) {
	return (<>
		<Form
			onSubmit={value => console.log(value)}
			title={true}
			tree={ExampleTree}
			type="create"
		/>
		<Form
			onSubmit={value => console.log(value)}
			title="Add Address"
			tree={ExampleTree}
			type="create"
		/>
	</>);
}
```

![FormTitle-0](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/FormTitle-0.png)

#### Form.tree

This is the instance of the [@ouroboros/define Tree](https://ouroboroscoding.com/define/#platform=javascript&page=parent) class which will be used to generate the sub components and validate them.

#### Form.type

Type dictates the text of the button and title as well as the logic used to return the value when `onSubmit` callback is called, and whether the `key` value is passed.

#### Form.value

Used to pass the initial values of the Form. Necessary for `update` types, and useful for `create` types that require a default value.

#### Form.variant

Matches [Material UI's TextField variant prop](https://mui.com/material-ui/api/text-field/). Defaults to 'outlined'.

`FormVariant.js`
```JSX
// Imports
import { Tree } from '@ouroboros/define';
import { Form } from '@ouroboros/define-mui';
import React from 'react';

// Tree
const ExampleTree = new Tree({
	__name__: 'Address',
	division: 'string',
	country: 'string'
});

// Component
export default function FormVariant(props) {
	return (<>
		<Form
			onSubmit={(value, key) => console.log(value, key)}
			title={true}
			tree={ExampleTree}
			type="create"
			variant="standard"
		/>
		<Form
			onSubmit={(value, key) => console.log(value, key)}
			title={true}
			tree={ExampleTree}
			type="update"
			variant="filled"
		/>
	</>);
}
```

![FormVariant-0](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/FormVariant-0.png)

## Results

### Simple Example
`definition.json`
```json
{
	"__name__": "Example",

	"id": {
		"__type__": "uuid",
		"__optional__": true
	},

	"created": {
		"__type__": "timestamp",
		"__optional__": true
	},

	"string": {
		"__type__": "string",
		"__maximum__": 32
	},

	"int": {
		"__type__": "int",
		"__miniumum__": 10,
		"__maximum__": 20
	},

	"date": {
		"__type__": "date",
		"__minumum__": "2024-01-01",
		"__optional__": true
	},

	"select": {
		"__type__": "string",
		"__options__": [ "one", "two", "three" ]
	},

	"bool": {
		"__type__": "bool"
	}
}
```

Here we have a simple example of a definition file using some standard types. We will use it to generate a simple Result to display existing records.

`ResultsSimple.js`
```JSX
// Imports
import { Tree } from '@ouroboros/define';
import { Results } from '@ouroboros/define-mui';
import { sortByKey } from '@ouroboros/tools';
import React from 'react';

// Definition
import ExampleDef from 'definition';

// Data
import DATA from 'data';

// Sort the data by 'string' node
DATA = DATA.sort(sortByKey('string'));

// Create the tree instance and merge it with UI specific info,
//	in this case, the list of fields from the definition we
//	want to see in the Results
const ExampleTree = new Tree(ExampleDef, {
	__ui__: {
		__results__: [ 'string', 'int', 'date', 'select' ],
		__primary__: 'id'
	}
});

// Component
export default function ResultsSimple(props) {
	return (
		<Results
			actions={false}
			data={DATA}
			orderBy="string"
			tree={ExampleTree}
		/>
	);
}
```

![ResultsSimple-0](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/ResultsSimple-0.png)

### Results props

| Name    | Type   | Default | Description |
| ------- | ------ | ------- | ----------- |
| [actions](#resultsactions) | object[] \| false | [] | Actions are icons that show up in the last row and trigger components or callbacks when clicked. Set to `false` to completely remove the column from the table, good for tables that are meant to be 100% read-only. |
| [custom](#resultscustom) | object | {} | Maps nodes to callbacks that are called to generate the text in their respective cells instead of using the built in logic based on the define type. |
| [data](#resultsdata) | object[] | required | The list of records to add as rows to the results. |
| [disableCSV](#resultsdisablecsv) | boolean | false | Set to `true` to remove the CSV icon which stores the raw data as a comma seperated value file. |
| [display](#resultsdisplay) | object | null | Used to set the fields that can be displayed without having to alter the [\_\_ui\_\_](#__ui__) special fields in the definition. |
| [dynamicOptions](#resultsdynamicOptions) | object[] | null | A list of nodes `node` that will receive new options `options` based on the change of another node `trigger`. Passed to `update` Forms when `onUpdate` prop is set. |
| [fields](#resultsfields) | string[] | All nodes in the same order as the Tree was created | The list, and order, of fields to be displayed in the Results Row. |
| [gridSizes](#resultsgridsizes) | { [node]: { xs, sm, md, lg, xl } } | { \_\_default\_\_: { xs: 12, sm: 6, lg: 3 } } | Allows custom mapping of the grid sizes per node. \_\_default\_\_ value is assigned to all nodes that aren't specified directly. If not set, all nodes will be on their own line across all 12 grid boxes if the screen is extra small, 2 on each line if the screen is small (12 / 2), and 4 on each line if the screen is large or larger (12 / 3). Passed to `update` Forms when `onUpdate` prop is set. |
| [gridSpacing](#resultsgridSpacing) | number | 2 | Defines the spacing between grid items. Passed to `update` Forms when `onUpdate` prop is set. |
| [menu](#resultsmenu) | object[] | [] | If any menu items are set, a menu icon (3 dots) shows up in the action column of each Row with the entries from this prop. |
| [onDelete](#resultsondelete) | function \| false | false | Adds a Delete icon to the action column of each Row, which, when clicked, calls this callback with the primary key of the Row. |
| [onKeyCopy](#resultsonkeycopy) | function | false | Called after a primary key is copied to the clipboard, useful to trigger some sort of message to the user that the key was copied. |
| [onNodeChange](#resultsonnodechange) | object | null | Useful for triggering code based on a nodes value changing. Callback receives the full record of all data, the name of the node that triggered, and the value that node was before it was changed. |
| [onUpdate](#resultsonupdate) | onSubmitCallback | null | If passed, adds an action icon to allow updating of the row's data via displaying an `update` Form and passing this callback to the `onSubmit` prop of that Form. |
| [order](#resultsorder) | 'asc' \| 'desc' | 'asc' | The actual order of the initial data associated with the `orderBy` prop. |
| [orderBy](#resultsorderby) | string | null | The name of the Node the initial data is ordered by. |
| [totals](#resultstotals) | boolean | false | If set to `true`, a final row is added to the Results which adds all the rows together based on the type |
| [tree](#resultstree) | Tree | required | The instance of the Tree which will be used to generate the Results as well as the `update` Form if one is required. |

#### Results.actions

Actions allow for creating a list of icon actions at the end of each row, either as a callback in which the programmer is responsible for the action, or as a React Component which will be displayed below the Row when the action is clicked.

Below is the full list of action settings

| Name | Type | Definition |
| ---- | ---- | ---------- |
| callback | function | Triggered when the action icon is clicked, is passed the entire record. |
| component | Component | The component to render below the Row, is passed the entire record as the `value` prop. |
| dynamic | function | Called to generate the icon at runtime for each Row. Expects a return object with action settings that are dynamic. |
| icon | string | The class name of the icon from font-awesome. |
| props | object | Additional props to pass to the Component when rendered. |
| tooltip | string | The tooltip message to display when the user hovers over the icon. |
| url | string | A url to redirect the user to when the icon is clicked. |
| url_pop | bool | Set to `true` to make the `url` settings open in a new tab. |

`ResultsActions.js`
```JSX
// Imports
import { Tree } from '@ouroboros/define';
import { Results } from '@ouroboros/define-mui';
import { sortByKey } from '@ouroboros/tools';
import React from 'react';

// Definition
import ExampleDef from 'definition';

// Data
import DATA from 'data';

// Sort the data by 'int' node
DATA.sort(sortByKey('int'));

// Create the tree instance
const ExampleTree = new Tree(ExampleDef);

// Component
export default function ResultsActions(props) {
	return (
		<Results
			actions={[ {
				callback: (data) =>
					alert(JSON.stringify(data)
				),
				icon: 'fa-solid fa-exclamation',
				tooltip: 'Alert'
			}, {
				component: ({ value }) => (
					<pre>{JSON.stringify(value, null, 4)}</pre>
				),
				icon: 'fa-solid fa-database',
				title: 'Render'
			}, {
				dynamic: (data) => ({
					url: `https://www.google.com/search?q=${data.string}`
				}),
				icon: 'fa-solid fa-up-right-from-square',
				tooltip: 'Google it',
				url_pop: true
			} ]}
			data={DATA}
			orderBy="int"
			tree={ExampleTree}
		/>
	);
}
```

In the above example, we add 3 actions to each row. The first uses `callback` to trigger a basic JavaScript alert to display the data. The second uses `component` for each Row that is displayed below. And the third uses `dynamic` to generate a URL for each Row in which the 'string' node is searched on Google in a new tab.

When generating a Component, the icon will change colour indicating it is "open". Clicking on the icon a second time will destroy the Component instead of triggering it again.

![ResultsActions-0](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/ResultsActions-0.png)

#### Results.custom

The custom prop allows for rendering whatever you want for each cell based on the node name. This is useful for combining data, cleaning it up, or just showing it in a different format.

`ResultsCustom.js`
```JSX
// Imports
import { Tree } from '@ouroboros/define';
import { nice } from '@ouroboros/dates';
import { Results } from '@ouroboros/define-mui';
import { sortByKey } from '@ouroboros/tools';
import React from 'react';

// Definition
import ExampleDef from 'definition';

// Data
import DATA from 'data';

// Sort the data by 'int' node
DATA.sort(sortByKey('int'));

// Create the tree instance
const ExampleTree = new Tree(ExampleDef);

// Component
export default function ResultsCustom(props) {
	return (
		<Results
			custom={{
				date: data =>
					nice(data.date, 'en-US', 'long', false)
			}}
			data={DATA}
			orderBy="int"
			tree={ExampleTree}
		/>
	);
}
```

Here we are printing the date in a nicer format instead of ISO standard.

![ResultsCustom-0](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/ResultsCustom-0.png)

#### Results.data

This is the array of records to be displayed in the Result, it is required, and must match the structure of the Tree for at least the nodes that will be displayed and/or updated.

#### Results.disableCSV

Set to `true` to remove the default CSV icon in the right hand header cell.

#### Results.display

The display prop is used to allow a way to override \_\_ui\_\_ values set in the defintion or the instance. Individual nodes can be set by passing the node name at the same level as the Parent \_\_ui\_\_ values.

`ResultsDisplay.js`
```JSX
// Imports
import { Tree } from '@ouroboros/define';
import { Results } from '@ouroboros/define-mui';
import { sortByKey } from '@ouroboros/tools';
import React from 'react';

// Definition
import ExampleDef from 'definition';

// Data
import DATA from 'data';

// Sort the data by 'int' node
DATA.sort(sortByKey('int'));

// Create the tree instance
const ExampleTree = new Tree(ExampleDef);

// Component
export default function ResultsDisplay(props) {
	return (
		<Results
			display={{
				__results__: [
					'id', 'date', 'string', 'int'
				],
				__update__: [
					'string', 'int', 'date', 'select', 'bool'
				],
				'id': { __title__: 'ID' },
				'date': { __title__: 'Viewed' },
				'string': { __title__: 'Key' },
				'int': { __title__: 'Speed' },
				'select': {
					__title__: 'Priority',
					__options__: [
						[ 'one', 'Highest' ],
						[ 'two', 'Medium' ],
						[ 'three', 'Minimal' ]
					]
				},
				'bool': { __title__: 'Active' }
			}}
			data={DATA}
			onUpdate={(data, key) =>
				console.log(data, key)}
			orderBy="int"
			tree={ExampleTree}
		/>
	);
}
```

The values will be used for the header titles, how each cell is displayed, and also affect the `update` Form if one is generated.

![ResultsDisplay-0](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/ResultsDisplay-0.png)

#### Results.dynamicOptions

This value is passed on to the `update` Form if one is rendered. See [Form.dynamicOptions](#formdynamicoptions) for more info.

#### Results.fields

This is a shortcut for \_\_ui\_\_.\_\_results\_\_ and \_\_ui\_\_.\_\_order\_\_, or the equivalent Form.display.\_\_results\_\_ and Form.display.\_\_order\_\_.

#### Results.gridSizes

This value is passed on to the `update` Form if one is rendered. See [Form.gridSizes](#formgridsizes) for more info.

#### Results.gridSpacing

This value is passed on to the `update` Form if one is rendered. See [Form.gridSpacing](#formgridspacing) for more info.

#### Results.menu

Menu allows for adding a drop down menu to the end of the actions which will include as many non-component actions as you wish.

| Name | Type | Description |
| ---- | ---- | ----------- |
| callback | function | Called when the menu item is clicked, passed all data associated with the Row |
| icon | string | The name of the icon from font-awesome |
| title | string | The text of the menu item |

`ResultsMenu.js`
```JSX
// Imports
import { Tree } from '@ouroboros/define';
import { Results } from '@ouroboros/define-mui';
import { sortByKey } from '@ouroboros/tools';
import React from 'react';

// Definition
import ExampleDef from 'definition';

// Data
import DATA from 'data';

// Sort the data by 'string' node
DATA.sort(sortByKey('string'));

// Create the tree instance
const ExampleTree = new Tree(ExampleDef);

// Component
export default function ResultsMenu(props) {
	return (
		<Results
			data={DATA}
			menu={[ {
				callback: (data) => alert(JSON.stringify(data)),
				icon: 'fa-solid fa-exclamation',
				title: 'Alert'
			}, {
				callback: (data) => console.log(data),
				icon: 'fa-solid fa-print',
				title: 'Console'
			} ]}
			orderBy="string"
			tree={ExampleTree}
		/>
	);
}
```

![ResultsMenu-0](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/ResultsMenu-0.png)

#### Results.onDelete

`onDelete` takes a callback that will pass the primary key of the record. When set, it adds an icon to the actions which when clicked will trigger the callback. It does not expect any return value, it is up to you to modify the data passed to the `data` prop or not.

`ResultsOnDelete.js`
```JSX
// Imports
import { Tree } from '@ouroboros/define';
import { Results } from '@ouroboros/define-mui';
import { sortByKey, arrayFindDelete } from '@ouroboros/tools';
import React, { useState } from 'react';

// Definition
import ExampleDef from 'definition';

// Data
import DATA from 'data';

// Sort the data by 'string' node
DATA.sort(sortByKey('string'));

// Create the tree instance
const ExampleTree = new Tree(ExampleDef);

// Component
export default function ResultsOnDelete(props) {
	const [ data, dataSet ] = useState(DATA);

	function onDelete(key) {
		dataSet(l => arrayFindDelete(l, 'id', key, true));
	}

	return (
		<Results
			data={data}
			onDelete={onDelete}
			orderBy="string"
			tree={ExampleTree}
		/>
	);
}
```

![ResultsOnDelete-0](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/ResultsOnDelete-0.gif)

#### Results.onKeyCopy

When displaying the primary key, the default behaviour is to show a key icon which copies the key to the clipboard when clicked. If for some reason you need to do something else after this happens, such as inform the user, you can use this prop to be notified.

`ResultsOnKeyCopy.js`
```JSX
// Imports
import { Tree } from '@ouroboros/define';
import { Results } from '@ouroboros/define-mui';
import { sortByKey } from '@ouroboros/tools';
import React from 'react';

// Definition
import ExampleDef from 'definition';

// Data
import DATA from 'data';

// Sort the data by 'string' node
DATA.sort(sortByKey('string'));

// Create the tree instance
const ExampleTree = new Tree(ExampleDef);

// Component
export default function ResultsOnKeyCopy(props) {
	return (
		<Results
			data={DATA}
			fields={['id', 'string', 'int']}
			onKeyCopy={key =>
				alert(`ID "${key}" copied to clipboard`)}
			orderBy="string"
			tree={ExampleTree}
		/>
	);
}
```

![ResultsOnKeyCopy-0](https://ouroboroscoding.s3.us-east-2.amazonaws.com/define-mui/ResultsOnKeyCopy-0.png)

#### Results.onNodeChange

This value is passed on to the `update` Form if one is rendered. See [Form.onNodeChange](#formonnodechange) for more info.

#### Results.onUpdate



#### Results.order

#### Results.orderBy

#### Results.totals

#### Results.tree