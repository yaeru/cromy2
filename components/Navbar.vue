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
					<!-- <Breadcrumbs class="mt-4 ml-4" :breadcrumbs="breadcrumbs"/> -->
					<nav aria-label="Breadcrumb">
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
								<NuxtLink to="/profile">My Account</NuxtLink>
							</li>
							<li>
								<a href="" @click="logout">Logout</a>
							</li>
						</template>
					</ul>
				</div>
			</div>
		</div>
	</nav>

	
</template>