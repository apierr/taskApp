define([
    'jquery',
//    'ui',
    'underscore', 
    'backbone',
    "mustache",
    'collections/todos',
    'views/todos',
    'text!templates/main.html',
    'text!templates/stats.html'
    ], function($, _, Backbone, Mustache, Todos, TodoView, mainTemplate, statsTemplate) {
    var AppView = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: $(".todoapp"),

        body: $("body"),

        // Our template for the line of statistics at the bottom of the app.
        mainTemplate: Mustache.render(mainTemplate),
        statsTemplate: _.template(statsTemplate),

        // Delegated events for creating new items, and clearing completed ones.
        events: {
            "keypress #new-todo":  "createOnEnter",
            "keyup #new-todo":     "showTooltip",
            "click .todo-clear a": "clearCompleted",
            "sortreceive": "onSortreceive",
            "sortremove": "onSortremove"
        },

        // At initialization we bind to the relevant events on the `Todos`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting todos that might be saved in *localStorage*.
        initialize: function initialize ()
        {
            _.bindAll(this, 'addOne', 'addAll', 'render');
            
            this.body.append(mainTemplate);
            this.input    = this.$("#new-todo");

            Todos.bind('add',     this.addOne);
            Todos.bind('reset',   this.addAll);
            Todos.bind('all',     this.render);

            Todos.fetch();
        },

        // Re-rendering the App just means refreshing the statistics -- the rest
        // of the app doesn't change.
        render: function render ()
        {
            var done = Todos.done().length;
            this.$('#todo-stats').html(this.statsTemplate({
                total:      Todos.length,
                done:       Todos.done().length,
                remaining:  Todos.remaining().length
            }));
            $("ul#todo-list").sortable({
                connectWith: ".connectedSortable"
            }).disableSelection();
            $("ul").sortable({});
        },

        // Add a single todo item to the list by creating a view for it, and
        // appending its element to the `<ul>`.
        addOne: function addOne (todo) 
        {
            var view = new TodoView({
                model: todo
            });
            
            this.$("#todo-list").append(view.render().el);

        },

        // Add all items in the **Todos** collection at once.
        addAll: function addAll () 
        {
            Todos.each(this.addOne);

        },

        // Generate the attributes for a new Todo item.
        newAttributes: function newAttributes () 
        {
            return {
                content: this.input.val(),
                order:   Todos.nextOrder(),
                done:    false
            };
        },

        // If you hit return in the main input field, create new **Todo** model,
        // persisting it to *localStorage*.
        createOnEnter: function createOnEnter (e) 
        {
            if (e.keyCode != 13) return;
            Todos.create(this.newAttributes());
            this.input.val('');
        },

        // Clear all done todo items, destroying their models.
        clearCompleted: function clearCompleted () 
        {
            _.each(Todos.done(), function(todo){ todo.clear(); });
            return false;
        },

        // Lazily show the tooltip that tells you to press `enter` to save
        // a new todo item, after one second.
        showTooltip: function showTooltip (e)
        {
            var tooltip = this.$(".ui-tooltip-top");
            var val = this.input.val();
            
            tooltip.fadeOut();
            if (this.tooltipTimeout) {
                clearTimeout(this.tooltipTimeout);
            }
            
            if (val == '' || val == this.input.attr('placeholder')) {
                return;
            }
            
            var show = function(){ tooltip.show().fadeIn(); };
            this.tooltipTimeout = _.delay(show, 1000);
        },
        
        onSortreceive: function onSortreceive (e, ui)
        {
            //console.log(this, Todos);
        },
        
        onSortremove: function onSortremove (e, ui)
        {
            $(ui.item[0]).trigger("drop");
        }
    });
    return AppView;
});
