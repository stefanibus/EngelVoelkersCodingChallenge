import axios from 'axios';


const Api = { 
  getAllData: async (setFull_data) => {
    let agents     = 'https://5e467f50fd1af600145de248.mockapi.io/api/agents';
    let shops      = 'https://5e467f50fd1af600145de248.mockapi.io/api/shops';
    let properties = 'https://5e467f50fd1af600145de248.mockapi.io/api/properties';

    const URLagents     = await axios.get(agents);
    const URLshops      = await axios.get(shops);
    const URLproperties = await axios.get(properties);

     axios
      .all([URLagents, URLshops, URLproperties])
      .then(
        axios.spread((...responses) => {
          const resAgents     = responses[0];
          const resShops      = responses[1];
          const resProperties = responses[2];

          const modifyData = (typeInfo, array) => {
            array.data.map((iteration, index) => (
               iteration['type'] = typeInfo,
               iteration['id'] = iteration.id+'-'+typeInfo
            ))
          }
          modifyData('agent', resAgents);
          modifyData('shop', resShops);
          modifyData('property', resProperties);

          const  concat = resAgents.data.concat(resShops.data, resProperties.data);
          const full_array =  {whenToUpdateProp: true, mergedArray: concat}
          setFull_data(full_array)
        }
        )
      )
      .catch((err) => {
        console.error('error Log Details: ', err);
      });
  },

};

export default Api;
 