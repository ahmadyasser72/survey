<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col items-center justify-center space-y-4 h-80vh">
	<p>akun: {data.username}</p>
	<a href="/_admin/new-poll" class="g-button">Buat polling baru</a>
</div>
