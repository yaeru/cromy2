<script setup lang="ts">
	const user = useSupabaseUser();
	const supaAuth = useSupabaseClient().auth;

	const logout = async () => {
		const { error } = await supaAuth.signOut();
		if (error) {
			alert(error.message);
		} else {
			return navigateTo('/login');
		}
	};

	const injectedUserTokens = inject<number>('userTokens');
	const updateUserTokens = inject<() => Promise<void>>('updateTokens');

</script>

<template>
	<nav class="uk-navbar-container">
		<div class="uk-container uk-container-expand">
			<div class="uk-navbar" uk-navbar>
				<div class="uk-navbar-left">
					<a class="uk-navbar-item uk-logo uk-hidden@m" href="#" aria-label="Back to Home">Logo</a>

					<nav aria-label="Breadcrumb" class=" uk-visible@m">
						<ul class="uk-breadcrumb uk-margin-remove">
							<li><a href="#">Home</a></li>
							<li><a href="#">Linked Category</a></li>
							<li class="uk-disabled"><a>Disabled Category</a></li>
							<li><span>Acá</span></li>
						</ul>
					</nav>
				</div>
				<div class="uk-navbar-right">
					<ul class="uk-navbar-nav">
						<template v-if="!user">
							<li>
								<NuxtLink to="/login">Login</NuxtLink>
							</li>
							<li>
								<NuxtLink to="/register">Register</NuxtLink>
							</li>
						</template>
						<template v-else>
							<div class="uk-navbar-item">
								<a class="uk-button uk-button-default"><span uk-icon="icon: database"></span> {{ injectedUserTokens }} / 100</a>
							</div>
							<li>
								<a href="#" uk-icon="icon: chevron-down">{{ user.email }}</a>
								<div class="uk-navbar-dropdown">
									<ul class="uk-nav uk-navbar-dropdown-nav">
										<li class="uk-nav-header">{{ user.email }}</li>
										<li class="uk-nav-divider"></li>
										<li><NuxtLink to="/profile">Mi Perfil</NuxtLink></li>
										<li><NuxtLink to="/profile">Mis Cartas</NuxtLink></li>
										<li class="uk-nav-divider"></li>
										<li><a href="" @click="logout">Salir</a></li>
									</ul>
								</div>
							</li>
							
						</template>
					</ul>
				</div>
			</div>
		</div>
	</nav>

	
</template>