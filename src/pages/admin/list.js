import * as React from "react"

import Page from 'layout/Page'

const AdminListPage = () => {

  return (
    <Page crumbs={[{display: 'Home', url: '/'}, {display: 'Admin', url: '/admin/'}, {display: 'List', url: '/admin/list/'}]}>
      <title>BG Top 10 Admin</title>
      <h1 className="--screen-reader">
        BG Top 10 Admin
      </h1>
      <section>
        Admin List
      </section>
    </Page>
  )
}

export default AdminListPage
