import axios from 'axios';

const Api = {
  getAllData: async () => {
    let agents     = 'https://5e467f50fd1af600145de248.mockapi.io/api/agents';
    let shops      = 'https://5e467f50fd1af600145de248.mockapi.io/api/shops';
    let properties = 'https://5e467f50fd1af600145de248.mockapi.io/api/properties';

    const URLagents     = axios.get(agents);
    const URLshops      = axios.get(shops);
    const URLproperties = axios.get(properties);

     const response =
      await   axios
              .all([URLagents, URLshops, URLproperties])
              .then(
                axios.spread((...responses) => {
                  const resAgents     = responses[0];
                  const resShops      = responses[1];
                  const resProperties = responses[2];

                  const processData = (typeInfo, array) => {

                      array.data.forEach((iteration, index) => {
                        iteration['type'] = typeInfo
                        iteration['id'] = iteration.id+'-'+typeInfo
                      })
                  }

                  processData('agent', resAgents);
                  processData('shop', resShops);
                  processData('property', resProperties);
                  const concat = resAgents.data.concat(resShops.data, resProperties.data);

                  const fullArray = { mergedArray: concat}
                  return fullArray
                  }
                )
              )
              .catch((err) => {
                console.error('error Log Details: ', err);
              });
        return response
  },

};

export default Api;
 