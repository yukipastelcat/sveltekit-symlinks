<script>
    export let data;
</script>

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {#each data.entries as entry}
        <tr>
            <td>{entry.name}</td>
            <td>
                <a href={`/users/${entry.id}`}>View</a>
            </td>
        </tr>
        {/each}
    </tbody>
</table>
