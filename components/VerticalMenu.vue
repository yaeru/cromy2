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
</script>

<template>
	<ul class="uk-nav-primary" uk-nav>
		<li class="uk-visible@m">
			<NuxtLink to="/" class="uk-logo">Logo</NuxtLink>
		</li>
		<li class="uk-nav-divider"></li>
		<li>
			<NuxtLink to="/">Home</NuxtLink>
		</li>
		<li>
			<NuxtLink to="/collections">Collections</NuxtLink>
		</li>
		<li>
			<NuxtLink to="/cards">Cards</NuxtLink>
		</li>
		<li v-if="user">
			<NuxtLink to="/protected">Protected</NuxtLink>
		</li>

		<li class="uk-parent">
			<a href="#">Parent <span uk-nav-parent-icon></span></a>
			<ul class="uk-nav-sub">
				<li><a href="#">Sub item</a></li>
				<li><a href="#">Sub item</a></li>
			</ul>
		</li>
		<li class="uk-parent">
			<a href="#">Parent <span uk-nav-parent-icon></span></a>
			<ul class="uk-nav-sub">
				<li><a href="#">Sub item</a></li>
				<li><a href="#">Sub item</a></li>
			</ul>
		</li>
		<li><a href="#">Item</a></li>
	</ul>
</template>