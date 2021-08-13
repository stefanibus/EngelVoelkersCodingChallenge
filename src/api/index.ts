// eslint-disable-next-line import/no-unresolved
import axios from 'axios'

const Api = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getAllData: async (spinnerLoadingData: unknown) => {
    const agents = 'https://5e467f50fd1af600145de248.mockapi.io/api/agents'
    const shops = 'https://5e467f50fd1af600145de248.mockapi.io/api/shops'
    const properties =
      'https://5e467f50fd1af600145de248.mockapi.io/api/properties'

    const URLagents = axios.get(agents)
    const URLshops = axios.get(shops)
    const URLproperties = axios.get(properties)

    const response = await axios
      .all([URLagents, URLshops, URLproperties])
      .then(
        axios.spread((...responses) => {
          const resAgents = responses[0]
          const resShops = responses[1]
          const resProperties = responses[2]

          // eslint-disable-next-line max-len
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const processData = (typeInfo: any, array: any): void => {
            array.data.forEach((iteration: { type: unknown; id: string }) => {
              // eslint-disable-next-line no-param-reassign
              iteration.type = typeInfo
              // eslint-disable-next-line no-param-reassign
              iteration.id = `${iteration.id}-${typeInfo}`
            })
          }
          processData('agent', resAgents)
          processData('shop', resShops)
          processData('property', resProperties)
          const concat = resAgents.data.concat(
            resShops.data,
            resProperties.data,
          )

          const fullArray = { mergedArray: concat }
          return fullArray
        }),
      )
      .catch((err) => {
        /*eslint-disable*/
        console.error('error Log Details: ', err)
        console.error(
          'THERE IS NO RESPONSE from APIrequest: the spinner-Data will be re-loaded as a workaround, see spinnerLoadingData: ',
          spinnerLoadingData,
        )
        return spinnerLoadingData
      })
    return response
  },
}

export default Api
