var Notelist = Ractive.extend({

	template: `
		<div class="col-md-3">
			<div class="panel panel-info">
				<div class="panel-heading" contenteditable="true" value={{createNoteTitle}}></div>
				<div class="panel-body" contenteditable="true" value={{createNoteBody}} style="height: 210px; overflow-y: scroll;"></div>
				<div class="panel-footer">
					<button type="button" class="btn btn-danger btn-sm" on-click="clear">Clear</button>
					<button type="button" class="btn btn-primary btn-sm" on-click="add">Add</button>
				</div>
			</div>
		</div>
		{{#each notes:i}}	
		  <div class="col-md-3">
			  <div class="panel panel-info">
				  <div class="panel-heading" contenteditable="true" value={{title}} on-click="edit">
					  {{title}}
				  </div>
				  <div class="panel-body" contenteditable="true" value={{content}} on-click="edit" style="height: 100px; overflow-y: scroll;">
					  {{content}}
				  </div>
				  {{#if editing}}
				  <div class="panel-footer">
					  <button type="button" class="btn btn-danger btn-sm" on-click="remove">Remove</button>
					  <button type="button" class="btn btn-primary btn-sm" on-click="save">Save</button>
				  </div>
				  {{/if}}
			  </div>
		  </div>
		{{/each}}
	`,

	addNote: function (title, content) {
		if (!content) return;
		this.push('notes', {
			title: title,
			content: content,
			editing: false
		});
	},

	removeNote: function (index) {
		this.splice('notes', index, 1);
	},

	editNote: function (index) {
		this.set('notes.' + index + '.editing', true);
	},

	saveNote: function (index, title, content) {
		this.set('notes.' + index + '.editing', false);
		this.set('notes.' + index + '.title', title);
		this.set('notes.' + index + '.content', content);
	},
	
	oninit: function () {
		// proxy event handlers
		this.on({
			remove: function (event) {
				this.removeNote(event.index.i);
			},
			edit: function (event) {
				this.editNote(event.index.i);
			},
			save: function (event) {
				this.saveNote(event.index.i, this.get().notes[event.index.i].title, this.get().notes[event.index.i].content);
			},
			add: function (event) {
				this.addNote(this.get().createNoteTitle, this.get().createNoteBody);
				this.set('createNoteTitle', '');
				this.set('createNoteBody', '');
			},
			clear: function (event) {
				this.set('createNoteTitle', '');
				this.set('createNoteBody', '');
			}
		});
	}
	
});


var noteCreator = new Notelist({
	el: 'container',
	data: {
		notes: [
			{title: "Test", content: "Nyaa", editing: false}
		]
	}
});


