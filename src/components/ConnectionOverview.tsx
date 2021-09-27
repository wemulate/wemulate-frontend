import { Connection } from '../models/Connection'
import ConnectionCard from './ConnectionCard'

type Props = {
  connections: Array<Connection>
}

const ConnectionOverview: React.FC<Props> = ({ connections }) => {
  return (
    <div>
      {connections.map((connection) => {
        return <ConnectionCard connection={connection} />
      })}
    </div>
  )
}

export default ConnectionOverview
