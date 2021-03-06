import React, { PropTypes } from 'react'
import { List, Map } from 'immutable'
import { readableFilesize } from './parse.js'

const GroupLeaderboard = ({entries}) => {
	let groupUploadValues = Map()

	entries.forEach((entry) => {
		entry.groups.forEach((group) => {
			if (groupUploadValues.has(group)) {
				groupUploadValues = groupUploadValues.set(group, groupUploadValues.get(group) + entry.size)
			} else {
				groupUploadValues = groupUploadValues.set(group, entry.size)
			}
		})
	})

	return (
		<table className="pure-table pure-table-horizontal" style={{textAlign: 'left'}}>
			<thead>
				<tr>
					<th> Name </th>
					<th> Uploaded </th>
				</tr>
			</thead>
			<tbody>
				{groupUploadValues.sortBy((uploaded) => -uploaded).map((uploaded, group) => (
					<tr key={group}>
						<td> {group} </td>
						<td> {readableFilesize(uploaded)} </td>
					</tr>
				)).toList()}
			</tbody>
		</table>
	)
}

GroupLeaderboard.propTypes = {
	entries: PropTypes.instanceOf(List).isRequired,
}

export default GroupLeaderboard

