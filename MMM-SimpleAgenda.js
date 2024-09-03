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
		showTomorrowAgenda: true,
		tomorrowAgendaStartsFrom: 18,
	  },

	start: function () {
		Log.info("Starting module: " + this.name);

        this.events = [];

		setInterval(() => {
		  this.updateDom(this.config.fadeSpeed);
		}, this.config.updateInterval);
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
		var hour = today.getHours();

		// get tomorrow date
		var tomorrow = new Date();
		tomorrow.setDate(today.getDate() + 1);

		if (hour >= this.config.tomorrowAgendaStartsFrom
			&& this.config.showTomorrowAgenda
		  ) {
			eventDate = tomorrow
			headerWrapper = document.createElement("tr");
			headerWrapper.innerHTML = "Tomorrow"
		} else {
			eventDate = today
			headerWrapper = document.createElement("tr");
			headerWrapper.innerHTML = "Today"
		}

		wrapper.appendChild(headerWrapper);

        for (var e in events) {
			var event = events[e];
            if(eventDate.getDate() == event.startDate.getDate() 
                && eventDate.getFullYear() == event.startDate.getFullYear() 
                && eventDate.getMonth() == event.startDate.getMonth()) {
                
                eventWrapper = document.createElement("tr");
                titleWrapper = document.createElement("td");
                titleWrapper.innerHTML = event.title;
		timeWrapper = document.createElement("td");
		// minutes correction to display 2 digits always
		minutes = (event.startDate.getMinutes() < 10 ? "0" : "") + event.startDate.getMinutes();
		timeWrapper.innerHTML = event.startDate.getHours() + ":" + minutes;
		eventWrapper.appendChild(timeWrapper);
                eventWrapper.appendChild(titleWrapper);
                wrapper.appendChild(eventWrapper);
            }
        }

        return wrapper;
	}
});
