import Grid from '@mui/material/Grid'
import { Connection } from '../models/Connection'
import ConnectionCard from './ConnectionCard'

type Props = {
  connections: Array<Connection>
}

const ConnectionOverview: React.FC<Props> = ({ connections }) => {
  return (
    <div>
      <Grid container spacing={2}>
        {connections.map((connection, key) => {
          return (
            <Grid item xs={12} sm={6} key={connection.connectionId}>
              <ConnectionCard connection={connection} />
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default ConnectionOverview
