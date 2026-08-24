<script setup>
import { Head, router, useForm, usePage } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import AdminCard from '@/Components/Admin/AdminCard.vue';
import { formatSlug } from '@/utils/admin';

const props = defineProps({ items: Array, serviceCategories: Object });
const page = usePage();
const flash = () => page.props.flash?.status;

const createForm = useForm({
  service_category: Object.keys(props.serviceCategories ?? {})[0] ?? 'plumbing',
  name: '',
  description: '',
  base_price: '',
  is_retired: false,
  order: 0,
});

function submitItem() {
  createForm.post('/admin/catalog', {
    preserveScroll: true,
    onSuccess: () => createForm.reset('name', 'description', 'base_price'),
  });
}

function updateItem(item, field, value) {
  router.patch(
    `/admin/catalog/${item.id}`,
    {
      service_category: item.service_category,
      name: item.name,
      description: item.description,
      base_price: item.base_price,
      is_retired: item.is_retired,
      order: item.order,
      [field]: value,
    },
    { preserveScroll: true },
  );
}

function removeItem(id) {
  if (confirm('Remove this catalog item?')) {
    router.delete(`/admin/catalog/${id}`, { preserveScroll: true });
  }
}
</script>

<template>
  <Head title="Catalog" />
  <AdminLayout title="Service catalog" subtitle="Manage catalog items and base pricing by service.">
    <p v-if="flash()" class="admin-flash">{{ flash() }}</p>

    <AdminCard title="Add catalog item" outline class="mb-4">
      <form class="admin-form" @submit.prevent="submitItem">
        <div class="admin-form__grid">
          <div class="admin-field">
            <label>Service category</label>
            <select v-model="createForm.service_category" class="form-control">
              <option v-for="(name, slug) in serviceCategories" :key="slug" :value="slug">{{ name }}</option>
            </select>
          </div>
          <div class="admin-field">
            <label>Name</label>
            <input v-model="createForm.name" class="form-control" required>
          </div>
          <div class="admin-field">
            <label>Base price (ZAR)</label>
            <input v-model="createForm.base_price" type="number" class="form-control" min="0" step="0.01">
          </div>
          <div class="admin-field">
            <label>Sort order</label>
            <input v-model.number="createForm.order" type="number" class="form-control" min="0">
          </div>
          <div class="admin-field" style="grid-column: 1 / -1">
            <label>Description</label>
            <textarea v-model="createForm.description" class="form-control" rows="2" />
          </div>
        </div>
        <button type="submit" class="btn-lte btn-lte-primary" :disabled="createForm.processing">Add item</button>
      </form>
    </AdminCard>

    <AdminCard title="Catalog items" outline flush>
      <div v-if="items?.length" class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Name</th>
              <th>Price</th>
              <th>Add-ons</th>
              <th>Retired</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id" class="admin-table__row">
              <td class="text-capitalize">{{ formatSlug(item.service_category) }}</td>
              <td>
                <input
                  class="form-control-sm"
                  :value="item.name"
                  @change="updateItem(item, 'name', $event.target.value)"
                >
              </td>
              <td>
                <input
                  type="number"
                  class="form-control-sm"
                  :value="item.base_price"
                  @change="updateItem(item, 'base_price', $event.target.value)"
                >
              </td>
              <td>{{ item.add_ons?.length ?? 0 }}</td>
              <td>
                <input
                  type="checkbox"
                  :checked="item.is_retired"
                  @change="updateItem(item, 'is_retired', $event.target.checked)"
                >
              </td>
              <td>
                <button type="button" class="btn-lte btn-lte-danger" @click="removeItem(item.id)">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="admin-empty">
        <p>No catalog items yet.</p>
      </div>
    </AdminCard>
  </AdminLayout>
</template>
