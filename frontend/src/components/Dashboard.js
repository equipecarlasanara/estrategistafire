import { useState } from 'react';
import Sidebar from './Sidebar';
import EstrategistaDigital from './EstrategistaDigital';
import GoalsDashboard from './GoalsDashboard';
import ContentLibrary from './ContentLibrary';
import ProfileAnalysis from './ProfileAnalysis';
import ObjectionExterminator from './ObjectionExterminator';
import SalesFunnel from './SalesFunnel';
import ImageEditor from './ImageEditor';
import PromptLibrary from './PromptLibrary';
import AdminPanel from './AdminPanel';

const views = {
  estrategista: EstrategistaDigital,
  dashboard: GoalsDashboard,
  prompts: PromptLibrary,
  analise: ProfileAnalysis,
  biblioteca: ContentLibrary,
  objecao: ObjectionExterminator,
  funil: SalesFunnel,
  editor: ImageEditor,
  admin: AdminPanel,
};

export default function Dashboard({ user, onLogout, onUpdateUser }) {
  const [active, setActive] = useState('estrategista');

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#080808', overflow: 'hidden' }}>
      <Sidebar active={active} setActive={setActive} user={user} onLogout={onLogout} onUpdateUser={onUpdateUser} />
      <main style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <div style={{ display: active === 'estrategista' ? 'block' : 'none', height: '100%' }}>
          <EstrategistaDigital user={user} onUpdateUser={onUpdateUser} />
        </div>
        <div style={{ display: active === 'dashboard' ? 'block' : 'none', height: '100%' }}>
          <GoalsDashboard user={user} setActive={setActive} />
        </div>
        <div style={{ display: active === 'prompts' ? 'block' : 'none', height: '100%' }}>
          <PromptLibrary />
        </div>
        <div style={{ display: active === 'analise' ? 'block' : 'none', height: '100%' }}>
          <ProfileAnalysis />
        </div>
        <div style={{ display: active === 'biblioteca' ? 'block' : 'none', height: '100%' }}>
          <ContentLibrary />
        </div>
        <div style={{ display: active === 'objecao' ? 'block' : 'none', height: '100%' }}>
          <ObjectionExterminator activeTab={active} />
        </div>
        <div style={{ display: active === 'funil' ? 'block' : 'none', height: '100%' }}>
          <SalesFunnel user={user} />
        </div>
        <div style={{ display: active === 'editor' ? 'block' : 'none', height: '100%' }}>
          <ImageEditor user={user} onUpdateUser={onUpdateUser} />
        </div>
        <div style={{ display: active === 'admin' ? 'block' : 'none', height: '100%' }}>
          <AdminPanel user={user} />
        </div>
      </main>
    </div>
  );
}

