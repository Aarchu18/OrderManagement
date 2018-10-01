using System;
using System.Collections.Generic;

namespace OrderManagementWepApi.Models
{
    public partial class ClientMaster
    {
        public int ClientId { get; set; }
        public string ClientName { get; set; }
        public string ClientAddress { get; set; }
        public long ClientContact { get; set; }
        public int ItemId { get; set; }

        public ItemMaster Item { get; set; }
    }
}
