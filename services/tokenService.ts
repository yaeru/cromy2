// tokenService.ts
export const useTokenService = () => {
	const supabase = useSupabaseClient();
	
	const userTokens = ref(0);
	const updateTokens = async () => {
		const user = useSupabaseUser();
		if (user.value) {
			const { data: { user } } = await supabase.auth.getUser();
			const response = await supabase.from('userTokens').select('tokens').eq('user_id', user.id);
			const tokensData = 'value' in response.data ? response.data.value : response.data;
			userTokens.value = tokensData.length > 0 ? tokensData[0].tokens : 0;
		} else {
			userTokens.value = 0;
		}
	};

	onMounted(() => {
		updateTokens();
	});
	return { userTokens, updateTokens };
};
