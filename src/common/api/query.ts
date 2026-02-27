import { QueryCache, QueryClient, MutationCache } from '@tanstack/react-query'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 10,
			retry: false,
			refetchOnReconnect: false,
			refetchOnMount: true,
			refetchOnWindowFocus: false,
			networkMode: 'always',
		},
		mutations: {
			retry: false,
		},
	},
	queryCache: new QueryCache({
		onError: async (error, query) => {
			console.error(`Query Error [${query.queryKey}]:`, error)
		},
		onSuccess: (_, query) => {
			console.info(`Query Success [${query.queryKey}]`)
		},
	}),
	mutationCache: new MutationCache({
		onError: (error, variables, context, mutation) => {
			console.error(`Mutation Error [${mutation.options.mutationKey}]:`, error)
		},
		onSuccess: (data, variables, context, mutation) => {
			console.info(`Mutation Success [${mutation.options.mutationKey}]`)
		},
		onMutate: async (variables, mutation) => {
			console.info(`Mutation Started [${mutation.options.mutationKey}]`)
		},
	}),
})
