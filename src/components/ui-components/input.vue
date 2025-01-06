<template>
  <div class="form-floating mt-5">
    <input :type="type"
           class="form-control"
           :id="label"
           :value="modelValue"
           :min="min"
           :max="max"
           required
           @input="$emit('update:modelValue', $event.target.value)"
           placeholder="Company name">
    <label :for="label">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    label: String,
    type: String,
    modelValue: String,
    min: {
      type: Number,
      required: false,
    },
    max: {
      type: Number,
      required: false,
    }
  }
}
</script>

<style>
/* Add your styles here */
</style>
