import { z } from 'zod'

const educationInfoSchema = z.object({
	id: z.number().optional(),
	major: z.string(),
	facility: z.string(),
	startTime: z.string(),
	endTime: z.string(),
	positionInList: z.number(),
})

export const profileSchema = z.object({
	name: z.string(),
	phoneNumber: z.string(),
	address: z.string(),
	description: z.string(),
	educationInfoList: z.array(educationInfoSchema),
})

export const createEducationItem = (index: number): ProfileForm['educationInfoList'][0] => ({
	id: undefined,
	major: '',
	facility: '',
	startTime: '',
	endTime: '',
	positionInList: index,
})

export type ProfileForm = z.infer<typeof profileSchema>

export type EducationInfoDTO = z.infer<typeof educationInfoSchema>
