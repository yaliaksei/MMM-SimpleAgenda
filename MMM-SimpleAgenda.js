/* MagicMirror²
 * Module: MMM-SimpleAgenda
 *
 * Description: display today's events as a table.
 * Depends on default calendar module broadcasted events
 * 
 * By Aliaksei Sery
 * MIT Licensed.
 */
Module.register("MMM-SimpleAgenda", {
	// Default module config.
	defaults: {
		//update every 5 minutes
		updateInterval: 5 * 60 * 1000,
		//fade speed
		fadeSpeed: 4000,
		//initial load delay
		initialLoadDelay: 0,
		//retry delay
		retryDelay: 2500,
		calendars: [],
	  },

	start: function () {
		Log.info("Starting module: " + this.name);

        this.events = [];

		setInterval(() => {
		  this.updateDom(this.config.fadeSpeed);
		}, this.config.updateInterval);
	},

    getHeader: function() {
		return "Agenda today"
	},

    notificationReceived: function(notification, payload, sender) {
	    if (notification === "CALENDAR_EVENTS") {
			this.events = payload.map(e => {
                e.startDate = new Date(+e.startDate);
				return e;
			}).filter( e => {
				cals = this.config.calendars;
				
				// iterate over cals
				for (var i = 0; i < cals.length; i++) {
					if (e.calendarName == cals[i]) {
						return true;
					}
				}
		    });

            this.updateDom();
        }
    }, 

	getDom: function() {
		const wrapper = document.createElement("table");
        wrapper.setAttribute("class", "simple_agenda bright")
        
        events = this.events;
        today = new Date();

        for (var e in events) {
			var event = events[e];
            if(today.getDate() == event.startDate.getDate() 
                && today.getFullYear() == event.startDate.getFullYear() 
                && today.getMonth() == event.startDate.getMonth()) {
                
                eventWrapper = document.createElement("tr");
                titleWrapper = document.createElement("td");
                titleWrapper.innerHTML = event.title;
                eventWrapper.appendChild(titleWrapper);
                wrapper.appendChild(eventWrapper);
            }
        }

        return wrapper;
	}
});
