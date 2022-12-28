import Grid from '@mui/material/Grid'
import { Connection } from '../models/Connection'
import ConnectionCard from './ConnectionCard'

type Props = {
  connections: Array<Connection>
  editConnection: (x: Connection) => Promise<void>
  removeConnection: (x: Connection) => Promise<void>
  getLogicalInterfaceNameById: (id: number) => string | undefined
}

const ConnectionOverview: React.FC<Props> = ({
  connections,
  editConnection,
  removeConnection,
  getLogicalInterfaceNameById,
}) => {
  return (
    <>
      {connections.map((connection) => {
        //TODO: Maybe use connectionid as key in the future
        return (
          <Grid item xs={12} sm={6} md={6} lg={4} key={connection.connectionName}>
            <ConnectionCard
              connection={connection}
              editConnection={editConnection}
              removeConnection={removeConnection}
              getLogicalInterfaceNameById={getLogicalInterfaceNameById}
            />
          </Grid>
        )
      })}
    </>
  )
}

export default ConnectionOverview
