# MMM-SimpleAgenda

MagicMirror module that displays current events as a table. Depend on default calendar module only.

## Installation

In the terminal, go to your's MagicMirror intsallation folder and execute the following command:

```
cd modules
```

Clone this repository

```
git clone https://github.com/yaliaksei/MMM-SimpleAgenda.git
```

## Usage and config

Add following module configuration in config.js

```
...
{
	module: "MMM-SimpleAgenda",
	position: "top_left", // any position of your choice
	config: {
        // specify calendars to get today's events from
        // calendar names should be defined in the default calendar module
		calendars: ["Family"],
	}
},
...
```
