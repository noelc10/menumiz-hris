const sampleTableData = [
	{
    id: 1,
		employee: {
			name: "Mark Jacobs",
			avatar: "assets/img/users/user-1.png",
		},
		dateRange: {
			start: "31 Mar, 2023 09:00 AM",
			end: "31 Mar, 2023 18:00 PM",
		},
		days: "1.0",
		leaveType: "Annual Leave",
		status: "pending",
	},
	{
    id: 2,
		employee: {
			name: "Charlie Kristen",
			avatar: "assets/img/users/user-2.png",
		},
		dateRange: {
			start: "31 Mar, 2023 09:00 AM",
			end: "31 Mar, 2023 18:00 PM",
		},
		days: "2.0",
		leaveType: "Annual Leave",
		status: "pending",
	},
	{
    id: 3,
		employee: {
			name: "Nur Fariha binti Maslan",
			avatar: "assets/img/users/user-3.png",
		},
		dateRange: {
			start: "31 Mar, 2023 09:00 AM",
			end: "31 Mar, 2023 18:00 PM",
		},
		days: "2.0",
		leaveType: "Hospital Leave",
		status: "pending",
	},
	{
    id: 4,
		employee: {
			name: "Nishant Talwar",
			avatar: "assets/img/users/user-4.png",
		},
		dateRange: {
			start: "31 Mar, 2023 09:00 AM",
			end: "31 Mar, 2023 18:00 PM",
		},
		days: "1.5",
		leaveType: "Sick Leave",
		status: "approved",
	},
  {
    id: 5,
		employee: {
			name: "Simon Minter",
			avatar: "assets/img/users/user-5.png",
		},
		dateRange: {
			start: "22 Feb, 2023 09:00 AM",
			end: "22 Feb, 2023 13:00 PM",
		},
		days: "0.5",
		leaveType: "Sick Leave",
		status: "approved",
	},
];

const resize = () => {
	var viewportWidth = $(window).width();

	if (viewportWidth <= 768) {
		$(".sidebar-nav-container").addClass("collapsed");
	} else {
		$(".sidebar-nav-container").removeClass("collapsed");
	}
};

const getMonthFromString = (month) => {
  var d = Date.parse(month + "1, " + new Date().getFullYear());

  if (!isNaN(d)) {
    return new Date(d).getMonth() + 1;
  }

  return -1;
}

// Initializations
window.addEventListener("load", (event) => {
	resize();
});

window.addEventListener("resize", (event) => {
	resize();
});

$(document).ready(() => {
	const swiperEl = document.querySelector("swiper-container");
	Object.assign(swiperEl, {
		slidesPerView: 1.1,
		spaceBetween: 30,
		freeMode: true,
		scrollbar: {
			enable: true,
			hide: false,
			el: ".swiper-scrollbar",
			draggable: false,
		},
		breakpoints: {
			320: {
				slidesPerView: 1.1,
				spaceBetween: 30,
			},
			1280: {
				slidesPerView: 2.1,
				spaceBetween: 30,
			},
		},
	});
	swiperEl.initialize();

  // Toggle Sidebar Navigation
	$(".sidebar-nav-toggle").on("click", () => {
		$(".sidebar-nav-container").toggleClass("collapsed");
	});

  // Toggle Notification
  $(".notifications-btn").on("click", () => {
    $(".notifications-container").toggleClass("hidden");
    $(this).toggleClass("shown");
  });

	$(".date-filter, .date-filter1, .date-filter2").select2({
		minimumResultsForSearch: -1,
		theme: "dark",
		width: "100px",
	});

	$("#monthFilter, #monthFilter1, #monthFilter2").datepicker({
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "MM yy",
		onClose: function () {
			function isDonePressed() {
				return (
					$("#ui-datepicker-div")
						.html()
						.indexOf(
							"ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all ui-state-hover"
						) > -1
				);
			}

			if (isDonePressed()) {
				var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
				var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();

				$(this).datepicker("setDate", new Date(year, month, 1)).trigger("change");
				$(".date-picker").focusout(); //Added to remove focus from datepicker input box on selecting date
			}
		},
		beforeShow: function (input, inst) {
			inst.dpDiv.addClass("month_year_datepicker");

			if ((datestr = $(this).val()).length > 0) {
				year = datestr.substring(datestr.length - 4, datestr.length);
				month = getMonthFromString(datestr.substring(0, 3));

				$(this).datepicker(
					"option",
					"defaultDate",
					new Date(year, month - 1, 1)
				);
				$(this).datepicker("setDate", new Date(year, month - 1, 1));
				$(".ui-datepicker-calendar").hide();
			}
		},
	});

	$("#leaveReqMonthFilter").datepicker({
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		dateFormat: "MM yy",
		showOn: "button",
		buttonImage: "assets/img/icons/vuesax/bold/arrow-down.png",
		buttonImageOnly: true,
		buttonText: "Select Date",
		onClose: function () {
			function isDonePressed() {
				return (
					$("#ui-datepicker-div")
						.html()
						.indexOf(
							"ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all ui-state-hover"
						) > -1
				);
			}

			if (isDonePressed()) {
				var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
				var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
        
				$(this).datepicker("setDate", new Date(year, month, 1)).trigger("change");
				$(".date-picker").focusout();
			}
		},
		beforeShow: function (input, inst) {
			inst.dpDiv.addClass("month_year_datepicker");

			if ((datestr = $(this).val()).length > 0) {
        year = datestr.substring(datestr.length - 4, datestr.length);
				month = getMonthFromString(datestr.substring(0, 3));

				$(this).datepicker(
					"option",
					"defaultDate",
					new Date(year, month - 1, 1)
				);
				$(this).datepicker("setDate", new Date(year, month - 1, 1));
				$(".ui-datepicker-calendar").hide();
			}
		},
	});
	$("#monthFilter, #monthFilter1, #monthFilter2, #leaveReqMonthFilter").datepicker("setDate", new Date());

	// Initialize DataTable
	$("#leaveReqsTable").DataTable({
		searching: false,
    paging: false,
    info: false,
		responsive: true,
    // ordering: false,
		order: [[2, "desc"]],
    columnDefs: [
      {
        targets: -1,
        orderable: false
      },
      {
        targets: -2,
        orderable: false
      }
    ],
    scrollX: true,
    headerCallback: function (thead, data, start, end, display) {
      $(thead).hide();
    },
    data: sampleTableData,
		columns: [
			{
				data: null,
				render: function (data) {
					return `
            <div class="leave-reqs-table-checkbox-container">
              <input data-id="${data.id}" name="leaveReqsTableIdCheckbox" id="leaveReqsTableIdCheckbox${data.id}" type="checkbox" class="leave-reqs-table-checkbox" aria-label="Select all" />
              <label for="leaveReqsTableIdCheckbox${data.id}"></label>
              ${[4, 5].includes(data.id) ? '<div class="marker green"></div>' : '<div class="marker orange"></div>'}
            </div>
          `;
				},
			},
			{
				data: "employee",
				render: function (data) {
					return `
            <div class="employee-info">
              <img width="40px" height="40px" src="${data.avatar}" alt="User Avatar" class="avatar" />
              <span>${data.name}</span>
            </div>
          `;
				},
			},
			{
				data: "dateRange",
				render: function (data) {
					return `
            <div class="date-range">
              <div>${data.start}</div>
              <div>${data.end}</div>
            </div>
          `;
				},
			},
			{ data: "days" },
			{ data: "leaveType" },
			{
				data: "status",
				render: function (data, index) {
					if (data === "pending") {
						return `
              <div class="leave-reqs-table-actions-container">
                <button class="btn-reject">REJECT</button>
                <button class="btn-approve">APPROVE</button>
              </div>
            `;
					}

          if (data === "approved") {
						return `
              <div class="leave-reqs-table-actions-container">
                <button class="btn-reject" style="display: none;">REJECT</button>
                <button class="btn-approve">APPROVED</button>
              </div>
            `;
					}

					return data.toUpperCase();
				},
			},
			{
				data: null,
				render: function () {
					return `
            <div class="leave-reqs-table-more-container">
              <button class="btn-more">
                <img width="40px" height="40px" src="assets/img/icons/vuesax/outline/arrow-right.png" alt="More" class="btn-more-icon" />
              </button>
            </div>
          `;
				},
			},
		],
	});

  $('#leaveReqsTableHeaderCheckbox').click(() => {
    var checkboxItemsLength = $('.leave-reqs-table input[name="leaveReqsTableIdCheckbox"]').length;

    if (this.checked) {
      $('.leave-reqs-table input[name="leaveReqsTableIdCheckbox"]').each(function () {
        this.checked = true;
        $(".leave-reqs-count-action").removeClass("hidden");
        $(".leave-reqs-count-action .title .count").text(checkboxItemsLength);
      });
    } else {
      $('.leave-reqs-table input[name="leaveReqsTableIdCheckbox"]').each(function () {
        this.checked = false;
        $(".leave-reqs-count-action").addClass("hidden");
        $(".leave-reqs-count-action .title .count").text('');
      });
    }
  });

  $('.leave-reqs-table input[name="leaveReqsTableIdCheckbox"]').change(() => {
    var countChecked = $('.leave-reqs-table input[name="leaveReqsTableIdCheckbox"]').filter(":checked").length;
    var checkboxItemsLength = $('.leave-reqs-table input[name="leaveReqsTableIdCheckbox"]').length;

    if (countChecked === checkboxItemsLength) {
      $('#leaveReqsTableHeaderCheckbox')[0].checked = true;
    } else {
      $('#leaveReqsTableHeaderCheckbox')[0].checked = false;
    }

    if (countChecked >= 1) {
      $(".leave-reqs-count-action").removeClass("hidden");
      $(".leave-reqs-count-action .title .count").text(countChecked);
    } else {
      $(".leave-reqs-count-action").addClass("hidden");
      $(".leave-reqs-count-action .title .count").text('');
    }
  });
});
