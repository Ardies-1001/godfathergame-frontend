<template>
  <div class="space-y-2">
    <div 
      class="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer relative group"
      @click="triggerFileInput"
      @dragover.prevent
      @drop.prevent="handleDrop"
    >
      <input 
        ref="fileInput"
        type="file" 
        accept="image/*" 
        class="hidden" 
        :multiple="multiple"
        @change="handleFileChange"
      />
      
      <div v-if="displayUrls.length > 0" class="w-full">
        <div v-if="multiple" class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div
            v-for="(url, index) in displayUrls"
            :key="index"
            class="relative h-32 w-full rounded-lg overflow-hidden bg-black/20 border border-white/10"
          >
            <img :src="url" class="h-full w-full object-contain" />
            <button 
              @click.stop="removeImage(index)"
              class="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-lg"
              title="Supprimer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>

        <div v-else class="relative h-48 w-full">
          <img :src="displayUrls[0]" class="h-full w-full object-contain rounded-lg" />
          <button 
            @click.stop="removeImage()"
            class="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>
      
      <div v-else class="flex flex-col items-center justify-center py-4 text-slate-400 group-hover:text-blue-400">
        <div class="p-3 bg-white/5 rounded-full mb-3 group-hover:bg-blue-500/10 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
        </div>
        <p class="font-medium">{{ multiple ? 'Cliquez ou glissez des images ici' : 'Cliquez ou glissez une image ici' }}</p>
        <p class="text-xs mt-1 text-slate-500">PNG, JPG, GIF jusqu'à 5MB</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string | string[]
  multiple?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | string[]): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const multiple = computed(() => !!props.multiple)
const displayUrls = ref<string[]>([])

watch(
  () => [props.modelValue, multiple.value] as const,
  ([value, isMultiple]) => {
    if (isMultiple) {
      displayUrls.value = Array.isArray(value) ? value.filter(Boolean) : value ? [value] : []
      return
    }

    if (typeof value === 'string') {
      displayUrls.value = value ? [value] : []
      return
    }

    displayUrls.value = Array.isArray(value) && value[0] ? [value[0]] : []
  },
  { immediate: true }
)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    void handleFiles(input.files)
  }
}

const handleDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    void handleFiles(event.dataTransfer.files)
  }
}

const toast = useToast()

const validateFile = (file: File) => {
  if (!file.type.startsWith('image/')) {
    toast.add({
      title: 'Format invalide',
      description: `Fichier ignoré : ${file.name}`,
      color: 'red'
    })
    return false
  }

  if (file.size > 5 * 1024 * 1024) {
    toast.add({
      title: 'Fichier trop volumineux',
      description: `Fichier ignoré : ${file.name} (max 5MB)`,
      color: 'red'
    })
    return false
  }

  return true
}

const readAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve((e.target?.result as string) || '')
    reader.onerror = () => reject(new Error('read_error'))
    reader.readAsDataURL(file)
  })

const handleFiles = async (files: FileList) => {
  const filesArray = Array.from(files)
  const validFiles = filesArray.filter(validateFile)
  if (validFiles.length === 0) {
    if (fileInput.value) fileInput.value.value = ''
    return
  }

  const dataUrls: string[] = []
  for (const file of validFiles) {
    try {
      const url = await readAsDataUrl(file)
      if (url) dataUrls.push(url)
    } catch {
      toast.add({
        title: 'Erreur de lecture',
        description: `Impossible de lire : ${file.name}`,
        color: 'red'
      })
    }
  }

  if (dataUrls.length === 0) {
    if (fileInput.value) fileInput.value.value = ''
    return
  }

  if (multiple.value) {
    const current = Array.isArray(props.modelValue)
      ? props.modelValue.filter(Boolean)
      : typeof props.modelValue === 'string' && props.modelValue
        ? [props.modelValue]
        : []
    emit('update:modelValue', [...current, ...dataUrls])
    toast.add({
      title: 'Images ajoutées',
      description: `${dataUrls.length} image(s) ajoutée(s) à la galerie`,
      color: 'green'
    })
  } else {
    emit('update:modelValue', dataUrls[0])
    toast.add({
      title: 'Image ajoutée',
      description: 'L\'image a été chargée avec succès',
      color: 'green'
    })
  }

  if (fileInput.value) fileInput.value.value = ''
}

const removeImage = (index?: number) => {
  if (multiple.value) {
    const next = displayUrls.value.slice()
    if (typeof index === 'number') next.splice(index, 1)
    emit('update:modelValue', next)
    if (fileInput.value) fileInput.value.value = ''
    return
  }

  emit('update:modelValue', '')
  if (fileInput.value) fileInput.value.value = ''
}
</script>
