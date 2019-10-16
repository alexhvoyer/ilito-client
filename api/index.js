import { request } from 'graphql-request'

export default (query, variables = {}) => {
    return request('http://10.0.2.2:3000/graphql', query, variables)
}