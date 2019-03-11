using Prism.Mvvm;
using ProS.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProS.Wpf.ViewModels
{
    public class BaseViewModel: BindableBase
    {
        private GlobalState _globalState = GlobalState.Instance;
        public GlobalState GlobalState
        {
            get
            {
                return _globalState;
            }
            set
            {
                SetProperty(ref _globalState, value);
            }
        }
    }
}
