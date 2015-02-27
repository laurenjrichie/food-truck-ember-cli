import Ember from 'ember';
import SemanticModalMixin from 'semantic-ui-ember/mixins/modal';

export default Ember.Route.extend(SemanticModalMixin, {
  actions: {
    showModal: function(name, model) {
      return this.render(name, {
        into: 'application',
        outlet: 'modal',
        model: model
      });
    },
    removeModal: function() {
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});
