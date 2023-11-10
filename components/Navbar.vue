<script setup lang="ts">
	const user = useSupabaseUser()
</script>

<template>
	<nav class="uk-navbar-container">
		<div class="uk-container">
			<div uk-navbar>
				<div class="uk-navbar-left">
					<ul class="uk-navbar-nav">
						<li>
							<NuxtLink to="/">Home</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/cards">Cards</NuxtLink>
						</li>
						<template v-if="!user">
							<li>
								<NuxtLink to="/login">Login</NuxtLink>
							</li>
							<li>
								<NuxtLink to="/register">Registro</NuxtLink>
							</li>
						</template>
						<li v-else>
							<NuxtLink to="/protected">Protected</NuxtLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
</template>