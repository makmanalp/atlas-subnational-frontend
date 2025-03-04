import DS from 'ember-data';
import Ember from 'ember';
import ENV from '../config/environment';
import ModelAttribute from '../mixins/model-attribute';
const {apiURL} = ENV;
const {computed, $} = Ember;

export default DS.Model.extend(ModelAttribute, {
  graphbuilderLocations: computed('id', function() {
    var defaultParams = {
      treemap: { variable: 'export_value', startDate: 2013, endDate: 2013 },
      multiples: { variable: 'export_value', startDate: 2008, endDate: 2013 },
      geo: { variable: 'export_value', startDate: 2013, endDate: 2013 },
      scatter: { variable: null,  startDate: 2012, endDate: 2013 },
      similarty: { variable: null,  startDate: 2012, endDate: 2013 }
    };
    return $.getJSON(`${apiURL}/data/product/${this.get('id')}/exporters?level=department`)
      .then((response) => {
       let data = response.data;
       let locationsMetadata = this.get('metaData.locations');

       // Merge the metadata names of the locations with their ids
       data = _.map(data, function(d) {
         let department = locationsMetadata[d.department_id];
         return _.merge(d, department);
       });
       return { entity: this, entity_type:'product', data: data, source: 'locations', defaultParams: defaultParams };
      }, function() {
       return { entity: this, entity_type:'product', data: [], source: 'locations', defaultParams: defaultParams };
      });
   }),
  graphbuilderCities: computed('id', function() {
    var defaultParams = {
      treemap: { variable: 'export_value', startDate: 2013, endDate: 2013 },
      multiples: { variable: 'export_value', startDate: 2008, endDate: 2013 },
      geo: { variable: 'export_value', startDate: 2013, endDate: 2013 },
      scatter: { variable: null,  startDate: 2012, endDate: 2013 },
      similarty: { variable: null,  startDate: 2012, endDate: 2013 }
    };
    return $.getJSON(`${apiURL}/data/product/${this.get('id')}/exporters?level=msa`)
      .then((response) => {
       let data = response.data;
       let locationsMetadata = this.get('metaData.locations');

       // Merge the metadata names of the locations with their ids
       data = _.map(data, function(d) {
         let department = locationsMetadata[d.msa_id];
         return _.merge(d, department);
       });
       return { entity: this, entity_type:'product', data: data, source: 'cities', defaultParams: defaultParams };
      }, function() {
       return { entity: this, entity_type:'product', data: [], source: 'cities', defaultParams: defaultParams };
      });
   })
});

