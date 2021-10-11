import Grid from '@mui/material/Grid'
import { Connection } from '../models/Connection'
import ConnectionCard from './ConnectionCard'

type Props = {
  connections: Array<Connection>
  editConnection: (x: Connection) => void
  removeConnection: (x: Connection) => void
  getLogicalInterfaceNameById: (id: number) => string | undefined
}

const ConnectionOverview: React.FC<Props> = ({
  connections,
  editConnection,
  removeConnection,
  getLogicalInterfaceNameById,
}) => {
  return (
    <div>
      <Grid container spacing={2}>
        {connections.map((connection) => {
          return (
            //TODO: Maybe use connectionid as key in the future
            <Grid item xs={12} sm={6} key={connection.connectionName}>
              <ConnectionCard
                connection={connection}
                editConnection={editConnection}
                removeConnection={removeConnection}
                getLogicalInterfaceNameById={getLogicalInterfaceNameById}
                connections={connections}
              />
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default ConnectionOverview
