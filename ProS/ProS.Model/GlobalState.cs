using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProS.Model.Panel;

namespace ProS.Model
{
    public class GlobalState
    {
        private static GlobalState _instance;
        public static GlobalState Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new GlobalState();
                    GlobalState.Instance.Panel.Name = "ZZZ"; //ToDo delete
                }
                return _instance;
            }
        }
        internal GlobalState()
        {
        }

        public PanelConfig Panel { get; } = new PanelConfig();
        public Connection Connection { get; } = new Connection();
    }
}
