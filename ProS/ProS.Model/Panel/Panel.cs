using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProS.Model.Panel
{
    public class PanelConfig
    {
        public Safety Safety { get; } = new Safety();
        public Security Security { get; set; } = new Security();

        public string Name { get; set; }
    }
}
