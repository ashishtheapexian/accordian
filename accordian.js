var accordian = (function () {
    "use strict";
    var scriptVersion = "1.0.0";
    var util = {
        version: "1.0.0",
        isAPEX: function () {
            if (typeof(apex) !== 'undefined') {
                return true;
            } else {
                return false;
            }
        },
        debug: {
            info: function (str) {
                if (util.isAPEX()) {
                    apex.debug.info(str);
                }
            },
            error: function (str) {
                if (util.isAPEX()) {
                    apex.debug.error(str);
                } else {
                    console.error(str);
                }
            }
        },
        loader: {
            start: function (id) {
                if (util.isAPEX()) {
                    apex.util.showSpinner($(id));
                } else {
                    /* define loader */
                    var faLoader = $("<span></span>");
                    faLoader.attr("id", "loader" + id);
                    faLoader.addClass("ct-loader");

                    /* define refresh icon with animation */
                    var faRefresh = $("<i></i>");
                    faRefresh.addClass("fa fa-user fa-5x fa-anim-spin");
                    faRefresh.css("background", "rgba(121,121,121,0.6)");
                    faRefresh.css("border-radius", "100%");
                    faRefresh.css("padding", "15px");
                    faRefresh.css("color", "white");

                    /* append loader */
                    faLoader.append(faRefresh);
                    $(id).append(faLoader);
                }
            },
            stop: function (id) {
                $(id + " > .u-Processing").remove();
                $(id + " > .ct-loader").remove();
            }
        },
        jsonSaveExtend: function (srcConfig, targetConfig) {
            var finalConfig = {};
            /* try to parse config json when string or just set */
            if (typeof targetConfig === 'string') {
                try {
                    targetConfig = JSON.parse(targetConfig);
                } catch (e) {
                    console.error("Error while try to parse targetConfig. Please check your Config JSON. Standard Config will be used.");
                    console.error(e);
                    console.error(targetConfig);
                }
            } else {
                finalConfig = targetConfig;
            }
            /* try to merge with standard if any attribute is missing */
            try {
                finalConfig = $.extend(true, srcConfig, targetConfig);
            } catch (e) {
                console.error('Error while try to merge 2 JSONs into standard JSON if any attribute is missing. Please check your Config JSON. Standard Config will be used.');
                console.error(e);
                finalConfig = srcConfig;
                console.error(finalConfig);
            }
            return finalConfig;
        },
        noDataMessage: {
            show: function (id, text) {
                var div = $("<div></div>")
                    .css("margin", "12px")
                    .css("text-align", "center")
                    .css("padding", "64px 0")
                    .addClass("nodatafoundmessage");

                var subDiv = $("<div></div>");

                var subDivSpan = $("<span></span>")
                    .addClass("fa")
                    .addClass("fa-search")
                    .addClass("fa-2x")
                    .css("height", "32px")
                    .css("width", "32px")
                    .css("color", "#D0D0D0")
                    .css("margin-bottom", "16px");

                subDiv.append(subDivSpan);

                var span = $("<span></span>")
                    .text(text)
                    .css("display", "block")
                    .css("color", "#707070")
                    .css("font-size", "12px");

                div
                .append(subDiv)
                .append(span);

                $(id).append(div);
            },
            hide: function (id) {
                $(id).children('.nodatafoundmessage').remove();
            }
        }
    };

    /***********************************************************************
     **
     ** Used to draw a container
     **
     ***********************************************************************/
    function drawContainer(parent) {
        var div = $("<div></div>");
        div.addClass("css3-animated-example");
        parent.append(div);
        return (div);
    }

    /***********************************************************************
     **
     ** Used to draw a row
     **
     ***********************************************************************/
    function drawRow(parent) {
        var div = $("<div></div>");
        div.addClass("apex-row");
        parent.append(div);
        return (div);
    }

    
    /************************************************************************
     **
     ** Used to render the html into region
     **
     ***********************************************************************/
    function renderHTML(pParentID, pData, pEscapeHTML, pConfigJSON) {

        var parent = $(pParentID);
        parent.parent().css("overflow", "inherit");

        var container = drawContainer(parent); // wrapper
        var row = container ;//drawRow(container);
        // var row = container;
        var cardNum = 0;
        var zindex = 10;
        var releaveHideIcon = pConfigJSON.releaveHideIcon;

        // cardNum = 12 / pConfigJSON.cardWidth;

        $.each(pData, function (idx, data) {
            cardNum = cardNum + pConfigJSON.cardWidth;

            // var matFlipCardCol = $("<div></div>");
            // matFlipCardCol.addClass("flip-c-col-" + pConfigJSON.cardWidth);

            var headings = $("<h3></h3>");
            // cols.addClass('columns col col-'+cardNum+' apex-col-auto');
			headings.html(data.TITLE);
            headings.addClass('title_head');
			
			
			var heading_icons = $('<i class ="fa fa-angle-down rotate-icon"></i>');
			headings.append(heading_icons);

            var l_container = $("<div></div>");
			l_container.addClass('content_text');
						
			var l_content = $("<div></div>");
            l_content.addClass("content");
			
            var l_text = $("<p></p>");
            l_text.addClass("text_content");
			l_text.html(data.TEXT);

            // var card_reveal_content_para = $("<p></p>");
            // card_reveal_content_para.html(data.CARD_REVEAL_CONTENT);
            // card_reveal_content_para.addClass("ashish_show_more_content")
			l_content.append(l_text);
			l_container.append(l_content);

            
            row.append(headings);
			row.append(l_container);
			       
        });
		 $(".css3-animated-example").collapse({
		  header: "> div > h3",
          accordion: true,
          persist: true,
          open: function() {
            this.addClass("open");
            this.css({ height: this.children().outerHeight() });
          },
          close: function() {
            this.css({ height: "0px" });
            this.removeClass("open");
          }
        });
		
		$('.content_text.open').css("background", "#aaffff");
		 $('.content_text.open').css("height", "auto");
			
    }
    /************************************************************************
     **
     ** Used to check data and to call rendering
     **
     ***********************************************************************/
    function prepareData(pParentID, pData, pNoDataFound, pEscapeHTML, pConfigJSON) {
        /* empty container for new stuff */
        $(pParentID).empty();

        if (pData.row && pData.row.length > 0) {

            renderHTML(pParentID, pData.row, pEscapeHTML, pConfigJSON);
        } else {

            $(pParentID).css("min-height", "");
            util.noDataMessage.show(pParentID, pNoDataFound);
        }
        util.loader.stop(pParentID);
    }

    return {
        render: function (regionID, ajaxID, noDataFoundMessage, items2Submit, escapeRequired, udConfigJSON) {
            var parentID = "#" + regionID + "-p";
            var stdConfigJSON = {
                "cardWidth": 4,
                "refresh": 0
            };

            var configJSON = {};
            configJSON = util.jsonSaveExtend(stdConfigJSON, udConfigJSON);
            /************************************************************************
             **
             ** Used to get data from APEX
             **
             ***********************************************************************/
            function getData() {

                $(parentID).css("min-height", "120px");
                util.loader.start(parentID);

                var submitItems = items2Submit;
                try {
                    apex.server.plugin(
                        ajaxID, {
                        pageItems: submitItems
                    }, {
                        success: function (pData) {
                            prepareData(parentID, pData, noDataFoundMessage, escapeRequired, configJSON)
                        },
                        error: function (d) {
                            console.error(d.responseText);
                        },
                        dataType: "json"
                    });
                } catch (e) {
                    console.error("Error while try to get Data from APEX");
                    console.error(e);
                }

            }

            // load data
            getData();

            /************************************************************************
             **
             ** Used to bind APEx Refresh event (DA's)
             **
             ***********************************************************************/
            try {
                apex.jQuery("#" + regionID).bind("apexrefresh", function () {
                    getData();
                });
            } catch (e) {
                console.error("Error while try to bind APEX refresh event");
                console.error(e);
            }

            /************************************************************************
             **
             ** Used to refresh by a timer
             **
             ***********************************************************************/
            if (configJSON.refresh && configJSON.refresh > 0) {
                setInterval(function () {
                    getData();
                }, configJSON.refresh * 1000);
            }
        }
    }

})();
